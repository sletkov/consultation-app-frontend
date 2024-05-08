import "./Signup.css"

export function Signup() {
    return (
      <div className="Signup">
        <h1 className="page-heading">Регистрация</h1>
        <div className="link-container">
          <a href="/sign-up/student" className="link">Я студент</a>
          <a href="/sign-up/teacher" className="link">Я преподаватель</a>
        </div>

      </div>
);
}