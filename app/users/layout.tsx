import Sidebar from '../components/sidebar/Sidebar';

const UsersLayout = async ({ children }: { children: React.ReactNode }) => (
  // @ts-expect-error Server Component
  <Sidebar>

    <div className="h-full ">{children}</div>
  </Sidebar>
);

export default UsersLayout;
