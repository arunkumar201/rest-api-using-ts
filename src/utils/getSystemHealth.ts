import os from 'os';

// var mem_in_bytes = os.freemem();
const mem_in_gb = Math.floor(os.freemem() / (1024 * 1024)).toFixed(2);
export const getSystemHealth = async () => {
	const healthData = {
		cpuUsage: os.loadavg(),
		freeMemory: `${mem_in_gb} MB`,
		totalMemory: `${(os.totalmem() / (1024 * 1024 * 1024)).toFixed(2)} GB`,
		uptime: `${(os.uptime() * 60).toFixed(4)} min`,
		hostname: os.hostname(),
		platform: os.platform(),
		arch: os.arch(),
		cpuCount: os.cpus().length,
	}

	return healthData;
}

export const getApplicationHealth = async () => {
	const appHealthData = {
		env: process.env.NODE_ENV,
		uptime: process.uptime().toFixed(2),
		memoryUsage: {
			heapTotal: `${(process.memoryUsage().heapTotal / (1024 * 1024)).toFixed(2)} MB`,
			heapUsed: `${(process.memoryUsage().heapUsed / (1024 * 1024)).toFixed(2)} MB`,
			external: `${(process.memoryUsage().external / (1024 * 1024)).toFixed(2)} MB`,
		},
		totalMemory: `${process.memoryUsage().heapTotal / (1024 * 1024)} MB`,
		cpuUsage: os.loadavg()[0],
		cpuCount: os.cpus().length,
	}
	return appHealthData;

}
