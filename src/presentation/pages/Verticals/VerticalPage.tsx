import { TopBarLayout } from 'infrastructure/components/Layout/TopBarLayout';
import { Main } from './Main/Main';

const VerticalPage = () => <TopBarLayout pageComponent={<Main />} />;

export default VerticalPage;
