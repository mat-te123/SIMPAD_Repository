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


