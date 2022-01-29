import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'

import ProductsScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import ProductCreateScreen from './screens/ProductCreateScreen'



import SupplierScreen  from './screens/SupplierScreen'
import SupplierCreateScreen from './screens/SupplierCreateScreen'
import SupplierEditScreen from './screens/SupplierEditScreen'

import CustomerScreen from './screens/CustomerScreen'
import CustomerCreateScreen from './screens/CustomerCreateScreen'
import CustomerEditScreen from './screens/CustomerEditScreen'

import SettingScreen from './screens/SettingScreen'

import SettingIncomeContributeCreateScreen from './screens/SettingIncomeContributeCreateScreen'
import SettingOutcomeContributeCreateScreen from './screens/SettingOutcomeContributeCreateScreen'
import SettingOutcomeMoneyCategoryCreateScreen from './screens/SettingOutcomeMoneyCategoryCreateScreen'
import SettingIncomeMoneyCategoryCreateScreen from './screens/SettingIncomeMoneyCategoryCreateScreen'
import SettingIncomeContributeEditScreen from './screens/SettingIncomeContributeEditScreen'
import SettingOutcomeContributeEditScreen from './screens/SettingOutcomeContributeEditScreen'
import SettingIncomeMoneyCategoryEditScreen from './screens/SettingIncomeMoneyCategoryEditScreen'
import SettingOutcomeMoneyCategoryEditScreen from './screens/SettingOutcomeMoneyCategoryEditScreen'


import FinanceScreen from './screens/FinanceScreen'
import FinanceIncomeCreateScreen from './screens/FinanceIncomeCreateScreen'
import FinanceIncomeEditScreen from './screens/FinanceIncomeEditScreen'
import FinanceOutcomeEditScreen from './screens/FinanceOutcomeEditScreen'
import FinanceOutcomeCreateScreen from './screens/FinanceOutcomeCreateScreen'




function App() {
  return (
    <Router>
      <Header />
      
      <main className="py-3">
        <Container>
          <Route path='/' component={HomeScreen} exact />
      
        
          
          <Route path='/supplier' component={SupplierScreen} exact/>
          <Route path='/supplier/create' component={SupplierCreateScreen} />
          <Route path='/supplier/:id/edit' component={SupplierEditScreen} />

          <Route path='/customer' component={CustomerScreen} exact/>
          <Route path='/customer/create' component={CustomerCreateScreen} />
          <Route path='/customer/:id/edit' component={CustomerEditScreen} />

          <Route path='/product' component={ProductsScreen} exact/>
          <Route path='/product/create' component={ProductCreateScreen} />
          <Route path='/product/:id/edit' component={ProductEditScreen} />

          <Route path='/finance' component={FinanceScreen} exact/>
          <Route path='/finance/income/create' component={FinanceIncomeCreateScreen} />
          <Route path='/finance/income/:id/edit' component={FinanceIncomeEditScreen} />

          <Route path='/finance/outcome/create' component={FinanceOutcomeCreateScreen} />
          <Route path='/finance/outcome/:id/edit' component={FinanceOutcomeEditScreen} />


          <Route path='/setting' component={SettingScreen} exact/>
          <Route path='/setting/income/contributecontext/create' component={SettingIncomeContributeCreateScreen} />
          <Route path='/setting/outcome/contributecontext/create' component={SettingOutcomeContributeCreateScreen} />
          <Route path='/setting/income/moneycategory/create' component={SettingIncomeMoneyCategoryCreateScreen} />
          <Route path='/setting/outcome/moneycategory/create' component={SettingOutcomeMoneyCategoryCreateScreen} />
          <Route path='/setting/outcome/moneycategory/:id/edit' component={SettingOutcomeMoneyCategoryEditScreen} />
          <Route path='/setting/income/moneycategory/:id/edit' component={SettingIncomeMoneyCategoryEditScreen} />
          <Route path='/setting/outcome/contributecontext/:id/edit' component={SettingOutcomeContributeEditScreen} />
          <Route path='/setting/income/contributecontext/:id/edit' component={SettingIncomeContributeEditScreen} />
         

         
        </Container>
      </main>
      
      <Footer />
    </Router>
  );
}

export default App;
