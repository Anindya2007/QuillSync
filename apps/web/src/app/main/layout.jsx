import { User ,LogOut} from 'lucide-react';
import LayoutOption from '../../components/ui/LayoutOptions';


export default function layout({Page,Options}) { {/*Here the Options parameter should be a list of options that should be given on sidebar*/}

    return (<div className="grid grid-cols-[260px_1fr] h-screen w-full rounded-2xl bg-[#F8F7FF]">

        {/* Sidebar div */}
        <div className=" grid grid-rows-[3fr_1fr]  border border-r-gray-600  rounded-l-2xl">

            <div className=' rounded-tl-2xl px-1.5 py-2 flex flex-col'>

            <div className='font-medium flex justify-center items-center h-fit w-full mt-8 '>
                <h1 className='text-3xl'><span className='text-indigo-600'>Quill</span>Sync</h1>
            </div>

            <div className='flex-1 w-full mt-10'>

                {Options.map((i)=>{
                    return <LayoutOption Icon={i.icon} Content={i.content} />
                })}

            </div>

            </div>

            <div className='border-t border-gray-600 rounded-bl-2xl py-2 px-2 '>
                <div className='flex items-center px-4 py-3 rounded-2xl cursor-pointer hover:bg-gray-200 '>
                    <h1 className='bg-indigo-400 text-indigo-800 rounded-full py-2 px-4 w-fit text-2xl mr-4'>A</h1>
                    <div>
                        <h2 className='font-bold'>Name</h2>
                        <p>Email</p>
                    </div>
                </div>

                <button className="flex items-center gap-3 w-full px-4 py-3 mt-3 rounded-xl border border-transparent text-red-500 cursor-pointer hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-all duration-200">
                    <LogOut size={25} />
                    <h1>Sign Out</h1>
                </button>


            </div>


        </div>

        {/* Dashboard */}
        <div className="border border-black rounded-r-2xl">

            <div className=" border-b-0 border-gray-200 h-19 rounded-tr-2xl flex justify-between px-14 items-center shadow-[0_8px_24px_rgba(99,102,241,0.15)]">
                {/* This is the div for header */}

                <h1 className='font-bold text-3xl'>Dummy</h1>

                <div className='flex gap-3 items-center justify-center px-2 py-1.5 '>
                    <User className='rounded-full bg-indigo-300 p-1.5 text-indigo-700' size={45} />
                    <button className="font-medium cursor-pointer rounded-2xl px-1.5 py-2 hover:bg-gray-300 "> Username </button>
                </div>

            </div>

            {/*The below div is for the data*/}

            <div className='p-3'>{Page}</div>

        </div>

    </div>)
};