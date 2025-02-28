/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'akvdlbsrieoffwhjgihc.supabase.co',
				port: '',
				pathname: '/storage/v1/object/public/cabin-images/**',
				search: '',
			},
		],
	},
	// output: 'export', // To export as a static site in npm run build
};

export default nextConfig;
