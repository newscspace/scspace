class FormUtil {

    getTeam = async () => {
        const res = await get('/api/team/mine');
        const body = await res.data;
        return body;
    }

    getMember = async (teamId) => {
        const res = await get('/api/team/id?id=' + teamId);
        const body = await res.data;
        return body;
    }



    checkSubmit = () => {
        if (this.state.content.teamMember.length === 0) {
            return '팀 멤버를 선택해주세요';
        }
        else if (new Date(this.state.timeFrom).getTime() >= new Date(this.state.timeTo).getTime()) {
            return '시작 시간과 종료 시간을 올바르게 선택해주세요';
        }
        else if (!this.state.timeFrom || !this.state.timeTo) {
            return '시작 시간과 종료 시간을 올바르게 선택해주세요';
        }

        return true;
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const error = this.checkSubmit();
        error === true ?
            this.sendPost()
                .then((res) => {
                    if (res.data.reserveId) {
                        this.props.history.push({ pathname: '/confirmation', state: res.data.reserveId });
                    }
                })
            : alert(error)
    }

    onMemberChange = (e) => {
        let nextstate = Object.assign({}, this.state);
        nextstate[e.target.name] = e.target.value;
        this.setState(nextstate);

        this.callApi_member(e.target.value)
            .then(res => {
                let memberlist = {}
                res.member.map((member) => {
                    memberlist[member.name] = member.id;
                })
                this.setState({ 'memberlist': memberlist });

            })
            .catch(err => console.log(err));
    }

    onTimeChange = (what, date) => {
        let nextstate = Object.assign({}, this.state);
        nextstate[what] = date;
        this.setState(nextstate);
    }
    onContentChange = (e) => {
        let nextstate = Object.assign({}, this.state);
        nextstate['content'][e.target.name] = e.target.value;
        this.setState(nextstate);
    }

    onCheckboxChange = (e,) => {
        let nextstate = Object.assign({}, this.state);
        nextstate.content[e.target.name].includes(e.target.value) ? nextstate.content[e.target.name].pop(e.target.value) : nextstate.content[e.target.name].push(e.target.value);

        this.setState(nextstate);
    }

    sendReq = (reservation, state) => {
        let mode = reservation ? 'update' : 'create';
        const url = '/api/reservation/' + mode;
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        return post(url, JSON.stringify(state), config);
    }
}