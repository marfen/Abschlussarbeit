import LoginScreen from "../components/LoginModule"

test("renders placeholder correct", () => {
    const {getByPlaceholderText} = render (<LoginScreen/>);
    
    //look for correct placeholder
    getByPlaceholderText("username");
    getByPlaceholderText("password");

})

test("shows incorrect username or password alert with empty textinput", () => {
    const {getByTestId} = render(<LoginScreen/>);

    //press login button with empty username and password textinput
    fireEvent.press(getByTestId("LoginScreen.LoginButton"));

    //look for correct error Message
    getByText("Username or password incorrect");

})

test("handle valid Login", () => {
    const {getByTestId } = render(<LoginScreen/>);

    
    //enter valid login input and press login Button
    fireEvent.changeText(getByTestId("LoginScreen.usernameInput"), "admin");
    fireEvent.changeText(getByTestId("LoginScreen.passwordInput"), "1234");
    fireEvent.press(getByTestId("LoginScreen.LoginButton"));

    //spies on "onClick" property of LoginButton Component
    const loginMethod = jest.spyOn(getByTestId("LoginScreen.LoginButton"), "onClick");

    //checks if login method is called 
    expect(loginMethod).toBeCalled();
    
})