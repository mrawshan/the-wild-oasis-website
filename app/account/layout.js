// Components
import SideNavigation from '@/app/_components/SideNavigation';

export default function Layout({ children }) {
	return (
		<div className='grid min-[1060px]:grid-cols-[16rem_1fr] min-[1060px]:h-full gap-12'>
			<SideNavigation />
			<div className='py-1'>{children}</div>
		</div>
	);
}
