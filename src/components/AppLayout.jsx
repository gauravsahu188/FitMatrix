import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import NavigationFooter from './Navigation-footer';

import Pattern from './BackgroundPattern';

const AppLayout = () => {
    return (
        <div className="relative isolate flex min-h-screen w-full flex-col bg-background-dark font-display text-text-primary-dark">
            <Pattern opacity={0.03} />
            <Header />
            <main className="flex-1 pb-24 pt-24 px-4">
                <Outlet />
            </main>
            <NavigationFooter />
        </div>
    );
};

export default AppLayout;
