

export default function LayoutOption({Icon,Content}) {
    return (<button className="flex  gap-5 items-center w-full px-4 py-3 rounded-xl font-medium border border-transparent text-indigo-600 cursor-pointer hover:border-indigo-200 hover:bg-indigo-200 hover:text-indigo-600 transition-all duration-200">
        <Icon size={25} />
        <h1 className='text-xl'>{Content}</h1>
    </button>)
}