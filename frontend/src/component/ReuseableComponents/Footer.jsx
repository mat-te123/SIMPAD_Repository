function Footer() {

    const logo = ['/SocialMedia/youtube.svg', '/SocialMedia/instagram.svg', '/SocialMedia/globe-alt.svg', ]
    const link = ['https://youtube.com/@teknologirekayasaperangkat660?si=3rOFYJmuWgOpSBxQ', 'https://www.instagram.com/set.svugm/', 'https://trpl.sv.ugm.ac.id/']
    const SocialMedia = logo.map((item, index) => (
        <a key={index} href={link[index]} target="_blank" rel="noopener noreferrer">
            <img src={item} alt="Social Media Icon" className="h-[20px] w-[20px]" />
        </a>
    ))

    return (
        <div className="h-fit flex flex-row items-center justify-between py-2 bg-[#333333] px-40">
            <p className="text-white text-[12px] font-normal">
                TRPL @ 2025. All rights reserved.
            </p>
            <div className="flex flex-row items-center gap-4">
                {SocialMedia}
            </div>
            
        </div>
    )
    
}

export default Footer;

