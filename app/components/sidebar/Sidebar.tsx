import DesktopSidebar from './DesktopSidebar';

const Sidebar = async ({ children }: { children: React.ReactNode }) => (

  <div className="h-full">
    <DesktopSidebar />
    <main className="lg:pl-20 h-full">

      {children}
    </main>
  </div>
);

export default Sidebar;
