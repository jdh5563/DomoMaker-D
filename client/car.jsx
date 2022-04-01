const helper = require('./helper.js');

const handleCar = e => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#domoName').value;
    const age = e.target.querySelector('#domoAge').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    if(!name || !age){
        helper.handleError('All fields are required!');
        return false;
    }

    helper.sendPost(e.target.action, {name, age, _csrf}, loadDomosFromServer);

    return false;
};

const CarForm = props => {
    return (
        <form id='carForm'
            onSubmit={handleCar}
            name='carForm'
            action='/car'
            method='POST'
            className='carForm'
        >
            <label htmlFor='carSkin'>Select Skin: </label>
            <input id='carSkin' type='radio' name='carSkin' />
            <input id='_csrf' type='hidden' name='_csrf' value={props.csrf} />
            <input className='makeCarSubmit' type='submit' value='Change Skin' />
        </form>
    )
};

const CarImage = props => {
    console.log(props.skin);
    const carImage = 
                <img src={props.skin || '/assets/img/cardefault.png'} alt='player car' className='playerCar' />;

    return (
        <div className='carImage'>
            {carImage}
        </div>
    );
};

const loadCarFromServer = async () => {
    const response = await fetch('/getCar');
    const data = await response.json();

    ReactDOM.render(
        <CarImage skin={data.skin} />,
        document.getElementById('carSection')
    );
};

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    ReactDOM.render(
        <CarForm csrf={data.csrfToken} />,
        document.getElementById('makeCar')
    );

    ReactDOM.render(
        <CarImage skin={'/assets/img/cardefault.png'} />,
        document.getElementById('carSection')
    );

    loadCarFromServer();
}

window.onload = init;