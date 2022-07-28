class SpaceInfo{
    user = 'KAISTian';
    reservable = true;
    supportsPreBook = true;
    requireTeam = true;
    kaistReservationsOnly= true;
    noFood = true;
    noDrinks = true;
    noShoes = false;
    alwaysOpen = true;
    roomcode = 0;
    roomname = 'ERROR';
    availability = '24/7';
    features = '공기청정기';
    shortIntro = '체육 및 무예활동을 할 수 있는 공간입니다. 열린 형태의 강좌 활동도 진행 가능합니다.';
    
    constructor(roomCode) {
        this.roomcode = roomCode;
        // Fetch room information according to room code
        // Good luck, backend Engi!
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