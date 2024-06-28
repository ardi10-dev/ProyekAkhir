import RiwayatAbsenMd from "../model/RiwayatAbsenMd"
import RiwayatIzinMd from "../model/RiwayatIzinMd"
import AprovalIzinMd from "../model/AprovIzinMd";
import LoginModel from "../model/LoginModel";
import ModelLokasi from "../model/ModelLokasi";

export const RIWAYAT = [
    new RiwayatAbsenMd('r1',
        '2025-02-15',
        'Tepat Waktu',
        '07:00:00',
        '17:00:00',
    ),
    new RiwayatAbsenMd('r2',
        '2025-05-15',
        'Tepat Waktu',
        '07:00:00',
        '17:00:00',
    ),
    new RiwayatAbsenMd('r3',
        '2025-02-15',
        'Tepat Waktu',
        '07:00:00',
        '17:00:00',
    ),
    new RiwayatAbsenMd('r4',
        '2025-02-15',
        'Tepat Waktu',
        '07:00:00',
        '17:00:00',
    ),
    new RiwayatAbsenMd('r5',
        '2025-02-15',
        'Tepat Waktu',
        '07:00:00',
        '17:00:00'
    ),
    new RiwayatAbsenMd('r6',
        '2025-02-15',
        'Tepat Waktu',
        '07:00:00',
        '17:00:00'
    ),
];

export const IZIN = [
    new RiwayatIzinMd('i1',
        'akil',
        '205565542',
        'Diajukan',
        'Dispensasi',
    ),
    new RiwayatIzinMd('i2',
        'akil',
        '205565542',
        'ditolak',
        'Cuti Ibadah',
    ),
    new RiwayatIzinMd('i3',
        'akil',
        '205565542',
        'Disetujui',
        'sakit',
    ),
];

export const IZINAPP = [
    new AprovalIzinMd(
        'i1',
        'wahyudi',
        '2055604154',
        'IT',
        'pusat',
        'sakit',
        '3',
        '16/07/2024',
        '18/07/2024',
        'masuk icu'
    ),
    new AprovalIzinMd(
        'i2',
        'julia',
        '2055604154',
        'IT',
        'pusat',
        'sakit',
        '3',
        '16/07/2024',
        '18/07/2024',
        'masuk icu'
    )
];

export const PEGAWAI = [
    new LoginModel(
        'p1',
        'user1', 
        'pwd1',
        'pimpinan',
        'wahyudi',
        '205530',
        'IT',
        'https://pixabay.com/id/illustrations/anak-anak-laki-laki-orang-melambai-5765632/'
    ),
    new LoginModel(
        'p2',        
        'user2', 
        'password2',
        'pegawai',
        'Padil',
        '205530',
        'IT',
    )
];

export const LOKASI = [
    new ModelLokasi('i1',
        '0.563',
        '101.4225',
        '0.564',
        '101.4225',
    ),
];
