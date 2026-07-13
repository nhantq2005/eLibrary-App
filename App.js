import { MyUserProvider } from './utils/providers/MyUserProvider';
import AppNavigation from './navigations/AppNavigation';
import { MyBuyCartProvider } from './utils/providers/MyBuyCartProvider';
import { MyBorrowCartProvider } from './utils/providers/MyBorrowCartProvider';

const App = () => {
  return (
    <MyUserProvider>
      <MyBuyCartProvider>
        <MyBorrowCartProvider>
          <AppNavigation />
        </MyBorrowCartProvider>
      </MyBuyCartProvider>
    </MyUserProvider>
  );
}


export default App;
