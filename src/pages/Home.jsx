import Hero           from '../components/Hero.jsx'
import DeviceFinder   from '../components/DeviceFinder.jsx'
import ShopByCategory from '../components/ShopByCategory.jsx'
import OurFavourites  from '../components/OurFavourites.jsx'
import BrandValues    from '../components/BrandValues.jsx'
import EditorialGrid  from '../components/EditorialGrid.jsx'
import ExploreStyles  from '../components/ExploreStyles.jsx'
import PeopleLovedIt  from '../components/PeopleLovedIt.jsx'
import CollectionsBento from '../components/Collectionsbento.jsx'
import Bestseller from '../components/Bestseller.jsx' 
import IWatchCollectionSection from '../components/Iwatchcollection.jsx'
import PhoneCasesCollection from '../components/PhoneCasesCollection.jsx'
import AirpodsCasesCollection from '../components/AirpodsCasesCollection.jsx'
import PhoneWalletCollection from '../components/PhoneWalletCollection.jsx'
import Shopbydevice from '../components/Shopbydevice.jsx'
import ShopByBrand from '../components/Shopbybrand.jsx'
export default function Home() {
  return (
    <main>
      <Hero />
      <Shopbydevice/>
      <CollectionsBento />
      <Bestseller />  
      <PhoneCasesCollection />
      <IWatchCollectionSection/>
      <AirpodsCasesCollection />
      <PhoneWalletCollection />
      {/* <DeviceFinder /> */}
      {/* <ShopByCategory />a */}
      {/* <OurFavourites /> */}
      <BrandValues />
      {/* <EditorialGrid /> */}
     
      <ExploreStyles />
       <ShopByBrand />
    </main>
  )
}
