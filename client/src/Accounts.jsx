import React, { useState } from 'react';
import server from './server';
export const Accounts = () => {
    const [accounts, setAccounts] = useState([]);

    const createAccount = async () => {
        try {
            const { data: account } = await server.post(`account`, {});
            setAccounts([...accounts, account]);
        } catch (ex) {
            alert(ex.response.data.message);
        }
    }
    return (
        <div className='container'>
            <h1>Accounts</h1>
            <div>
                {accounts.map(x => (<div className='container'>
                    <label>
                        Private key
                        <input value={x.privateKey} disabled></input>
                    </label>
                    <label>
                        Public key
                        <input value={x.publicKey} disabled></input>
                    </label>
                </div>)
                )}
                <button button className='button' onClick={createAccount}>Create Account</button>
            </div>
        </div>
    )
}
