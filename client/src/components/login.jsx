export default function Login(){
    return(
        <form className="login">
            <h1>Welcome Back,Login here!</h1>
            <input type="text" placeholder="username"/>
            <input type="password" placeholder="password"/>
            <button>
                Login
            </button>
        </form>

    );
}