import Navbar from '../ReuseableComponents/navbar'
import Footer from '../ReuseableComponents/Footer'
import { useState } from 'react'
import { useLocation } from 'react-router-dom';



function MainTemplate({ title, children }) {
    const [isBorder,setBorder] = useState(true);

    function Assist(){
        setBorder(!isBorder);
        document.documentElement.classList.toggle("assist", !isBorder);
    }

    const CurrentLocation = useLocation().pathname;
    console.log(CurrentLocation);



    return (
            <div className="relative h-screen w-screen bg-black overflow-y-auto">
                <div className='fixed z-100 top-0 left-0 py-6 px-5'>
                    <button className='bg-red-600 p-2 rounded-xl text-white cursor-pointer font-bold hover:bg-red-700' onClick={Assist}>
                        {isBorder ? "Disable Assist" : "use Assist"}
                    </button>
                </div>
                <div className={`${CurrentLocation === "/" ? "fixed bg-white/20 backdrop-blur-md shadow-sm" : "fixed bg-white"} top-0 left-0 z-50  w-full`}>
                    <Navbar title={CurrentLocation}/>
                </div>
                <div className='relative pt-0'>
                    {children}
                </div>
                <div className='relative w-full'>
                    <Footer/>
                </div>
            </div>

    )

}

export default MainTemplate
