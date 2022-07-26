class SpaceInfo{
    user = 'KAISTian';
    kaistReservationsOnly= true;
    noFood = true;
    noDrinks = true;
    noShoes = false;
    roomcode = 0;
    roomname = 'ERROR';
    availability = '24/7';
    features = '공기청정기';
    constructor() {
        
    }
    maxCapacity() {
        return 20;
    }
    availabilityExplained(){
        let a = this.availability;
        if (a == '24/7') {
            return '24시간 언제나';
        } else if (a == '9-6') {
            return '오전 9시부터 오후 6시까지';
        }
    }
}

export default SpaceInfo;