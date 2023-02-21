import Link from 'next/link';
import { useActionContext } from '@/context';

const Header = () => {
	return (
		<div>
			<Link href="/create">Add</Link>
		</div>
	);
};

export default Header;
