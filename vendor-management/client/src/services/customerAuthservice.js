export default{
    login : async user=>{
        const res = await fetch('/customer/login', {
            method : "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        return data;
    },

    register : async user=>{
        const res = await fetch('/customer/register', {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        return data;
    },

    logout: async ()=> {
        const res = await fetch('/customer/logout');
        const data = await res.json();
        return data;
    },

    isAuthenticated : async ()=>{   //sync backend and frontend for keeping the user signed in in case app is closed and open again, we will use the context api to call this function
        const res = await fetch('/customer/authenticated');
        if (res.status !== 401)
            return res.json().then(data => data);

        else
            return { isAuthenticated: false, user: { username: "" } };
    }
}
