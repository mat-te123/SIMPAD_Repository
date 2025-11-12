function Company({logo,name}) {

    return (
        <div className="flex flex-row items-center justify-center bg-[#E6F1F1] py-[20px] px-[40px] rounded-4xl gap-3 shadow-xl/10">
            <img src={logo} alt="Logo Perusahaan" width='30' height='30'/>
            <span className="text-[20px] font-bold text-[#697077]">
                {name}
            </span>
        </div>
    )
        
    
    
}

export default Company;