// İmport Alanı:
import React, { useEffect, useState } from 'react'
import "../../Create/create.scss"
import Input from './../../Create/Input';
import Select from './../../Create/Select';
import { sortOptions, statusOptions, typeOptions } from '../../../constants/contant';
import api from './../../../utils/api';
import { useDispatch } from 'react-redux';
import { setJobs } from "../../../redux/slices/jobSlice";


const Filter = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState();
  const [debounceText, setDebounceText] = useState();
  const [status, setStatus] = useState();
  const [type, setType] = useState();
  const [sort, setSort] = useState();

  // console.log(text,status,type, setSort);  

  // 1.// Text'e Debounce uyguluyoruz:
  // Text State'i her değiştiğinde api isteği at ve filtrele:
  useEffect(() => {
    console.log("Tuşa Başıldı");
    // Text undefined ise fonsksiyonu durdur:
    if (text === undefined) return;
    // Her tuş vuruşunda bir sayaç başlat:
    //  const id=setTimeout(()=>console.log("Tuşa Basıldı.."),3000);
    const id = setTimeout(() => setDebounceText(text), 300);

    // Eğer süre bitmeden useEffect tekrar çalışırsa(Önceki Sayacı durdurmalıyım):
    return () => clearTimeout(id);

  }, [text]);

// <-------------------------------->
  // 2.// orginal text parametre geçip text aratması filtrelemesi:
 // Text State'i her değiştiğinde çalışıyor:
  // useEffect(() => {
  //   const params = {
  //     q: text,
  //     status:status,
  //   }

  //   // Api'a parametreler ile birlikte istek at:
  //   api
  //     .get("/jobs", { params })
  //     // Gelen cevabı Reducer'a haber veriyoruz..
  //     .then((res) => dispatch(setJobs(res.data)));
  // }, [text]);
// <-------------------------------->
console.log(sort);

// 3.// Debounce paraetre olarak da uygulanmış hali:
// Stateler her değiştiğinde çalışıyor:
 useEffect(() => {
  const params = {
    q: debounceText,
    status,
    type,
    _sort: sort==="a-z"|| sort==="z-a" ? "company" : "date",
    _order: sort==="a-z"|| sort==="En Eski" ? "asc": "desc",
  };

  // Api'a parametreler ile birlikte istek at:
  api
    .get("/jobs", { params })
    // Gelen cevabı Reducer'a haber veriyoruz..
    .then((res) => dispatch(setJobs(res.data)));
}, [debounceText,status,type,sort]);

// Filtreleri Sıfırlama:
const handleReset=()=>{
  setText();
  setDebounceText();
  setStatus();
  setType();
  setSort();
};




  return (
    <div className='filter-sec'>
      <h2>Filtreleme Formu</h2>
      <form>
        <Input label="Ara" handleChange={(e) => setText(e.target.value)} />
        <Select label="Durum" options={statusOptions} handleChange={(e) => setStatus(e.target.value)} />
        <Select label="Tür" options={typeOptions} handleChange={(e) => setType(e.target.value)} />
        <Select label="Sıralama" options={sortOptions} handleChange={(e) => setSort(e.target.value)} />
        <div className=''>
          <button onClick={handleReset} type='reset' className='button'>Filtreleri Sıfırla</button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
