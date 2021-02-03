import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_SUPABASE_KEY
  )
export const Modal = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [name, setName] = useState('');
    const [nameSaved, setNameSaved] = useState(false);
    const [issue, setIssue] = useState('');

    async function signupUser() {
        try {
            let { user, error } = await supabase.auth.signUp({
                email: email,
                password: password
            })
            if (error) {
                alert('Error with signup: ' + error.message)
            } else {
                if (!user) alert('Please check your e-mail for sign up confirmation.');
                await supabase
                    .from('profiles')
                    .insert([
                        { 'email': email },
                    ])
                document.querySelector('.modal-container').classList.toggle('hidden');
                document.querySelector('#modal-trigger').innerText = 'Submit Issue or Feature';
                setLoggedIn(true);
                }
        } catch (error) {
            console.log('error', error);
            alert(error.error_description || error);
        }
    }
    async function loginUser() {
        try {
            let { error } = await supabase.auth.signIn({
                email: email,
                password: password
            });
            if (error) {
                alert('Error logging in: ' + error.message);
            } else {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('name')
                    .eq('email', email)
                    if (error) { return } else {
                        setName(data[0]['name']);
                    }
                document.querySelector('.modal-container').classList.toggle('hidden');
                document.querySelector('#modal-trigger').innerText = 'Submit Issue or Feature';
                setLoggedIn(true);
            }
        } catch (error) {
            console.log('error', error);
            alert(`Did you need to sign up first? ${error.error_description || error}`);
        }
    }
    async function logoutUser() {
        try {
            let { error } = await supabase.auth.signOut();
            if (error) {
                alert('Error logging out: ' + error.message)
            } else {
                document.querySelector('.modal-container').classList.toggle('hidden');
                document.querySelector('#modal-trigger').innerText = 'Login';
                setLoggedIn(false);
            }
        } catch (error) {
            console.log('error', error);
            alert(error.error_description || error);
        }
    }
    async function updateProfile() {
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ 'name': name })
                .eq('email', email)
                if (error) {
                    alert('Error logging out: ' + error.message)
                } else {
                    document.querySelector('.modal-container').classList.toggle('hidden');
                    setNameSaved(true)
                }
        } catch (error) {
            console.log('error', error);
            alert(error.error_description || error);
        }
    }
    async function submitIssue() {
        try {
            const { error } = await supabase
                .from('upvote')
                .insert({ 'votes': 0, 
                    "status": "Idea", 
                    "category": "Issue", 
                    "type": "Issue", 
                    "feature_name": "User Generated", 
                    "feature_description": issue 
                })
                if (error) {
                    alert('Submission error: ' + error.message)
                } else {
                    document.querySelector('.modal-container').classList.toggle('hidden');
                    alert('Your request has be submitted successfully!')
                }
        } catch (error) {
            console.log('error', error);
            alert(error.error_description || error);
        }
    }
    
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={ ()=> document.querySelector('.modal-container').classList.toggle('hidden') }></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                            <svg width="96" height="67" viewBox="0 0 96 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M79.6178 57.8766C80.6908 57.2131 81.7147 56.4727 82.6808 55.6615C83.6661 54.8342 84.5913 53.9334 85.4472 52.9657L71.5826 50.7385C69.0628 51.6897 66.273 52.013 63.4155 51.554C54.6908 50.1525 48.7541 41.9437 50.1556 33.2189C51.5571 24.4942 59.766 18.5576 68.4907 19.959C77.2154 21.3605 83.1521 29.5694 81.7506 38.2941C81.7092 38.5517 81.662 38.8068 81.609 39.0593L86.5822 51.59C89.1307 48.2757 90.9144 44.2979 91.624 39.8801C93.9014 25.7025 84.2544 12.363 70.0767 10.0856C55.899 7.80822 42.5596 17.4553 40.2822 31.6329C38.0048 45.8106 47.6519 59.1501 61.8295 61.4274C68.2467 62.4583 74.4922 61.0461 79.6178 57.8766Z" fill="#738699"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M16.6754 52.8766C15.6025 52.2131 14.5786 51.4727 13.6125 50.6615C12.6272 49.8342 11.702 48.9334 10.8461 47.9657L24.7107 45.7385C27.2305 46.6897 30.0202 47.013 32.8777 46.554C41.6025 45.1525 47.5391 36.9437 46.1376 28.2189C44.7362 19.4942 36.5273 13.5576 27.8026 14.959C19.0778 16.3605 13.1412 24.5694 14.5427 33.2941C14.584 33.5517 14.6313 33.8068 14.6842 34.0593L9.71101 46.59C7.16257 43.2757 5.37887 39.2979 4.66923 34.8801C2.39184 20.7025 12.0389 7.36301 26.2166 5.08561C40.3942 2.80822 53.7337 12.4553 56.0111 26.6329C58.2885 40.8106 48.6414 54.1501 34.4637 56.4274C28.0466 57.4583 21.8011 56.0461 16.6754 52.8766Z" fill="#738699"/>
                            </svg>
                        </div>
                        {loggedIn === false &&
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                    Login / Signup with email address
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Create an account with your e-mail address. Be sure to activate before you log in.
                                    </p>
                                    <input className="m-2" onChange={ (event) => setEmail(event.target.value) } 
                                    type="email" value={email} placeholder="E-mail">
                                    </input>                        
                                    <input className="m-2" onChange={ (event) => { setPassword(event.target.value) }}
                                    type="password" value={password} placeholder="Password">
                                    </input>
                                </div>
                            </div>
                        }
                        {loggedIn === true &&
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                    Hello {name || "anonymous ! Fill in some profile information!"}                      
                                </h3>
                                {nameSaved === false &&
                                <div className="mt-2">
                                    <input onChange={ (event) => setName(event.target.value) } 
                                    type="text" value={name || ""} placeholder="Name">
                                    </input>
                                    <button onClick={updateProfile} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                        Update Profile
                                    </button>  
                                </div>
                                }
                                <div>
                                    <p>Create an issue or new feature request:</p>
                                    <textarea className="w-full" onChange={ (event) => setIssue(event.target.value) } 
                                    type="text" value={issue} placeholder="Issue / Feature request">
                                    </textarea>
                                    <br></br>
                                    <hr></hr>
                                    <br></br>
                                    <button onClick={submitIssue} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                        Submit Issue or Feature Request
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                {loggedIn === false && 
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">        
                    <button onClick={signupUser}  type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Sign up
                    </button>
                    <button onClick={loginUser} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Sign In
                    </button>
                </div>
                }
                {loggedIn === true && 
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">                 
                    <button onClick={logoutUser} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Sign Out
                    </button>
                </div>
                }
            </div>
        </div>
    </div>
    )
}