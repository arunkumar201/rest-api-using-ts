import { ConnectionOptions, Queue } from "bullmq";

const MicroServices = ["M-1", "M-2", "M-3", "M-4"];

export const REDIS_CONNECTION_OPTIONS: ConnectionOptions = {
	port: parseInt(process.env.REDIS_PORT || "6379"),
	host: process.env.REDIS_HOST,
	username: "default",
	password: process.env.REDIS_PASSWORD,
	retryStrategy: () => {
		console.timeLog("reconnectStrategy", "reconnectStrategy");
		return 500;
	},
};

//Load balancer which distribute the request based on least number of jobs in queue or where a server is
//more free
class AutoScalingLoadBalancer {
	private queues: Record<string, Queue> = {};

	/**
	 * Constructor for initializing queues for each service.
	 */
	constructor() {
		for (const service of MicroServices) {
			const queue = new Queue(`MQueue-${service}`, {
				connection: REDIS_CONNECTION_OPTIONS,
			});

			this.queues[service] = queue;
		}
	}

	/**
	 * A function to distribute a job.
	 *
	 * @param {any} jobData - the data of the job to be distributed
	 * @return {Promise<void>} a Promise that resolves to void
	 */
	public async distributeJob(jobData: unknown): Promise<void> {
		const selectedQueue = await this.selectQueueDynamically();

		console.debug(
			"🚀 ~ AutoTradingLoadBalancer ~ distributeJob ~ selectedQueue:",
			selectedQueue?.name
		);

		if (selectedQueue) {
			await selectedQueue.add("PlaceOrderJob", jobData);
			console.log(`Job distributed with : ${jobData}`);
		} else {
			console.error("No available queues to distribute the job.");
		}
	}

	/**
	 * Asynchronously selects a optimal queue dynamically.
	 *
	 * @return {Promise<Queue | null>} A promise that resolves with the selected queue or null if no queue is available.
	 */
	private async selectQueueDynamically(): Promise<Queue | null> {
		const availableQueues = await this.getAvailableQueues();

		if (availableQueues.length === 0) {
			return null;
		}
		return this.selectQueueBasedLeastJobs(availableQueues);
	}

	private async getAvailableQueues(): Promise<Queue[]> {
		const queueNames = Object.keys(this.queues);
		const queues = await Promise.all(
			queueNames.map(async (queueName) => {
				const queue = this.queues[queueName];
				return queue;
			})
		);

		return queues.filter((queue) => queue !== null) as Queue[];
	}

	/**
	 * Selects a queue based on the least number of waiting jobs.
	 *
	 * @param {Queue[]} queues - an array of Queue objects
	 * @return {Promise<Queue | null>} a Promise resolving to a Queue object or null
	 */
	private async selectQueueBasedLeastJobs(
		queues: Queue[]
	): Promise<Queue | null> {
		if (queues.length === 0) {
			return null;
		}

		const queueDetails = await Promise.all(
			queues.map(async (queue) => ({
				queue,
				waitingJobCount: await queue.getWaitingCount(),
			}))
		);

		// Sort the queues based on the number of waiting jobs
		queueDetails.sort((a, b) => a.waitingJobCount - b.waitingJobCount);
		// Find the smallest waiting job count
		const smallestWaitingJobCount = queueDetails[0].waitingJobCount;

		// Filter potential queues with the smallest waiting job count
		const potentialQueues = queueDetails.filter(
			(q) => q.waitingJobCount === smallestWaitingJobCount
		);

		// If there are multiple potential queues, choose randomly
		const selectedQueue =
			potentialQueues[Math.floor(Math.random() * potentialQueues.length)].queue;

		return selectedQueue;
	}
}

const autoScalingLoadBalancer = new AutoScalingLoadBalancer();
export { autoScalingLoadBalancer };
