import Navbar from "../components/Navbar";
import {useNavigate} from "react-router-dom";
function Enter()
{
    return (
    <div>
        <Navbar></Navbar>
        <div className="container text-center">
            <div className="row align-items-center">
                <div className="col">

                </div>
                <div className="col">
                    <EnterForm></EnterForm>
                </div>
                <div className="col">

                </div>
            </div>
        </div>
    </div>
)
}

function EnterForm() {
    const navigate = useNavigate();
    function enter()
    {
        navigate('/school')
    }

    return (
        <form>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1"/>
            </div>

            <button onClick={enter} type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default Enter;