import AuthTemplate from "../Template/AuthTemplate";
import './EmailLogin.css'

function EmailLogin() {
    return (
        <AuthTemplate title={"Find by Email"}>
            <form className="Email-Form-Container" action="" method="post">
                <div>
                    <label>text</label>
                </div>
                <div className="Input-Place-Holder">
                    <label htmlFor="email">UGM Mail</label>
                    <input  type="email" name="Email" id="Email" />
                </div>
                <button className="Email-Btn" type="submit">Submit</button>
            </form>
        </AuthTemplate>
    )
}

export default EmailLogin;