// İmport Alanı:
import React from 'react'
import Input from './Input';
import "./create.scss";
import Select from './Select';
import { statusOptions, typeOptions } from '../../constants/contant';
import api from './../../utils/api';
import { useDispatch } from 'react-redux';
import { createJobs } from '../../redux/slices/jobSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



const Create = () => {
  // Navigasyon Kurulumu:
  const navigation = useNavigate();
  // Dispatch Kurulumu:
  const dispatch = useDispatch();
  // Form Gönderildiğinde çalışcak fonksiyon:
  const handleSubmit = (e) => {
    // Sayfa yenilenmeyi engeleme:
    e.preventDefault();
    // Inputlara FormData ile Eriş:
    const formData = new FormData(e.target);
    //  FormData içersindeki değerleri nesneye çevir:
    const jobData = Object.fromEntries(formData.entries());
    // console.log(jobData);
    // Güncel tarih verisine eriş ve bunu JobData içerisine ata:
    jobData.date = Date.now();
    // console.log(jobData);

    // Api'a istek at ve eğer istek başarılı ise reducer'a haber ver:
    api
      .post("/jobs", jobData)
      .then((res) => {
        // ReducerA haber vermek lazım:
        dispatch(createJobs(res.data));
        // Kullancıya bilidirm gönder:
        toast.success("Başvuru Oluşturuldu..");
        // Her işlem onaylandıysa || işlem başarılıysa Home Sayfasına yönlendir:
        navigation("/");
      })
      // HATA durumunda kullanıcıya bildirimde bulun:
      .catch((err) => {
        toast.error(`Başvurunuz Sırasında Bir Sorun Oluştu:${err.message}`)
      });
};

  return (
    <div className="add-page">
      <section className="container">
        {/* Titile */}
        <h2>Yeni İş Ekle</h2>
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Input label="Pozisyon" name="position" />
          <Input label="Şirket" name="company" />
          <Input label="Lokasyon" name="location" />
          {/* <Input label="Logo" name="logo" /> */}
          <Select label="Durum" name="status" options={statusOptions} />
          <Select label="Tür" name="type" options={typeOptions} />
          <div className='btn-wrapper'>
            <button className="button">Oluştur</button>
          </div>
        </form>

      </section>
    </div>
  )
}

export default Create;
