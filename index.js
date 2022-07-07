function setFormMssg(formElement, type, mssg)
{
    const mssgElement= formElement.querySelector(".form_mssg");
    mssgElement.textContent = mssg;
    mssgElement.classList.remove("form_mssg-success","form_mssg-error");
    mssgElement.classList.add("form_mssg-${type}");
}
function setInputError(inputElement, mssg)
{
    inputElement.classList.add("form_input-error");
    inputElement.parentElement.querySelector(".form_input-error-mssg").textContent = mssg;
}
function clearInputError(inputElement)
{
    inputElement.classList.remove("form_input-error");
    inputElement.parentElement.querySelector(".form_input-error-mssg").textContent = "";
}

document.addEventListener("DOMContentLoaded", ()  =>
{
    const loginForm = document.getElementById("login");
    const createAccountForm = document.getElementById("signup");

    document.getElementById("linkCreateAccount").addEventListener("click",e =>{
        e.preventDefault();
        loginForm.classList.add("form-hidden"); 
        createAccountForm.classList.remove("form-hidden"); 
    });
    document.getElementById("linkLogIn").addEventListener("click",e =>{
        e.preventDefault();
        loginForm.classList.remove("form-hidden"); 
        createAccountForm.classList.add("form-hidden"); 
    });

    loginForm.addEventListener("submit",e=>
    {
        e.preventDefault();

        //perform AJAX/Fetch Login

        setFormMssg(loginForm, "error", "Invalid username or password")
    });
    document.querySelectorAll(".form_input").forEach(inputElement=>{
        inputElement.addEventListener("blur", e =>
        {
            if(e.target.id==="signupUsername" && e.target.value.length > 0 && e.target.value.length < 8)
            {
                setInputError(inputElement, "Username must be atleast 8 characters in length");
            }
        });
        inputElement.addEventListener("input", e =>
        {
            clearInputError(inputElement);
        });
    });
});