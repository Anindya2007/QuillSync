export default function AuthLayout({children}){

    return (
        <div className="flex justify-center items-center min-h-screen w-screen bg-[url('/Signup.png')] bg-no-repeat bg-cover bg-center" >

            {children}
        </div>
    )
}