import './LandingPage.css'
import { useNavigate } from 'react-router-dom'

export default function LandingPage (){

const navigate = useNavigate();

    return (
    <div className="box" onClick={() => navigate('/home')}>
        <div>
            <h3>Welcome to:</h3>
            <h2>Henry Dog!</h2>
        </div>
    </div>
    )
}