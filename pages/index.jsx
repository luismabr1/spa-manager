import Calendar from 'components/Calendar';
import Link from 'next/link';

import { userService } from 'services';

export default Home;

function Home() {
    return (
        <div className="p-4">
            <div className="container-fluid">
                <h1>Hi {userService.userValue?.firstName}!</h1>
                <p>You&apos;re logged.</p>
                <p><Link href="/users">Administrar usuarios</Link></p>

                


            </div>
            <Calendar />
        </div>
    );
}
