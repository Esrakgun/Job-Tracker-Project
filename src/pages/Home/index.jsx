// İmpoert Alanı:
import React from 'react'
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import Card from '../Create/Card';
import "./home.scss"
import Filter from './Filter';


const Home = () => {
  // Store abone ol ve jobs verisini console'a yazdır.
  const { isLoading, error, jobs } = useSelector((store) => store.jobReducer);
  // console.log(state);

  return (
    <div className='home-page'>
      {/* Filter */}
       <Filter/>

      {/* jobs Data */}



      {/*Yükleniyorsa Loader'ı Hata varsa Error bileşenini iş verileri gelsiyse render et:*/}
      {isLoading ? (
        <Loader/>
      ) : error ? (
        <Error info={error}/>
      ) : (
        <div className='cards-wrapper'>
          {jobs.length === 0 ? <p className='warn'>Aranılan Kriterlere Uygun Başvuru Bulunamadı </p> : jobs.map((job) => (
            <Card key={job.id} job={job}/>))}
        </div>)}



    </div>
  )
}

export default Home;
