function Footer() {

    const logo = ['/SocialMedia/youtube.svg', '/SocialMedia/facebook.svg', '/SocialMedia/twitter.svg', '/SocialMedia/instagram.svg', '/SocialMedia/linkedin.svg', ]

    return (
        <div className="h-[207px] flex flex-col items-center justify-between py-10 bg-[#333333]">
            <div className="flex flex-row items-center gap-4">
                {logo.map((gambar,index) => (
                    <img key={index} src={gambar} alt="logo social media" />
                ))}
            </div>
            <p className="text-white text-[14px] font-normal">
                TRPL @ 2025. All rights reserved.
            </p>
        </div>
    )
    
}

export default Footer;

