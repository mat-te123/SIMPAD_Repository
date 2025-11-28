## PAD 1 Repository SIM PAD
### hal yang perlu diperhatikan

1. laravel sudha berjalan secara langsung saat docker dijalankan jadi tidak perlu serve didalam container
2. perhatikan env
3. Perintha untuk Build container 
```
docker compose up --build -d
```
4. Perintah unutk menghapus container beserta databasenya
```
docker compose down -v
```


# Bagian Dokumentasi
alangkah baiknya untuk mengisi bagian dokumentasi ini agar mudah untuk melakukan tracking 

12/11/25

Bikin Repository yang lebih rapi

14/11/25

Connect Backend ke Frontend, index lebih dinamis, fixing controller di backend, nambah function baru buat login pake google decided unutk ngapus semua function login jadinya cuma pake loginwithgoogle sama logout


19/11/25

update front end, progress tinggal 80 persen tinggal update auth dan masukin project, yang belum beberapa controller dari backend

28/11/25

udah 90 persen selesai tapi malah ketemu banyak bug di bagian block blockan, ada dua opsi tapi kayaknya bakal pake opsi yang paling gampang karena ngejar target