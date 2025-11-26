import { useEffect, useState, useCallback } from "react";
import { apiRequest } from "./api";

function App() {
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [registerForm, setRegisterForm] = useState({
    fullName: "",
    emailId: "",
    password: "",
    role: "user",
  });

  const [loginForm, setLoginForm] = useState({
    emailId: "",
    password: "",
  });
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({
    title: "",
    amount: "",
    category: "",
    isAvailable: true,
  });
  const [editingId, setEditingId] = useState(null);
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      await apiRequest("/auth/register", "POST", registerForm);
      setMessage("Registered successfully, now you can login.");
      setAuthMode("login");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const data = await apiRequest("/auth/login", "POST", loginForm);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      setMessage("Login success");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    setProducts([]);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };
  const fetchProducts = useCallback(async () => {
    if (!token) return;
    try {
      const data = await apiRequest("/products", "GET", null, token);
      setProducts(data.data || data);
    } catch (err) {
      setMessage(err.message);
    }
  }, [token]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleProductChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submitProduct = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!token) return;

    const payload = {
      title: productForm.title,
      amount: Number(productForm.amount),
      category: productForm.category,
      isAvailable: productForm.isAvailable,
    };

    try {
      if (editingId) {
        await apiRequest(`/products/${editingId}`, "PUT", payload, token);
        setMessage("Product updated");
      } else {
        await apiRequest("/products", "POST", payload, token);
        setMessage("Product created");
      }
      setProductForm({
        title: "",
        amount: "",
        category: "",
        isAvailable: true,
      });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      setMessage(err.message);
    }
  };

  const startEditProduct = (product) => {
    setEditingId(product._id);
    setProductForm({
      title: product.title,
      amount: product.amount,
      category: product.category,
      isAvailable: product.isAvailable,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setProductForm({ title: "", amount: "", category: "", isAvailable: true });
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await apiRequest(`/products/${id}`, "DELETE", null, token);
      setMessage("Product deleted");
      fetchProducts();
    } catch (err) {
      setMessage(err.message);
    }
  };
  if (!user || !token) {
    const isLogin = authMode === "login";

    return (
      <div className="app">
        <div className="auth-card">
          <h2>{isLogin ? "Login" : "Register"}</h2>

          {isLogin ? (
            <form className="form" onSubmit={submitLogin}>
              <div className="form-group">
                <label>Email</label>
                <input
                  name="emailId"
                  type="email"
                  className="input"
                  value={loginForm.emailId}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  className="input"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <button className="btn btn-primary" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          ) : (
            <form className="form" onSubmit={submitRegister}>
              <div className="form-group">
                <label>Full name</label>
                <input
                  name="fullName"
                  className="input"
                  value={registerForm.fullName}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  name="emailId"
                  type="email"
                  className="input"
                  value={registerForm.emailId}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  className="input"
                  value={registerForm.password}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select
                  name="role"
                  className="input"
                  value={registerForm.role}
                  onChange={handleRegisterChange}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin (testing)</option>
                </select>
              </div>
              <button className="btn btn-primary" disabled={loading}>
                {loading ? "Signing up..." : "Signup"}
              </button>
            </form>
          )}

          {message && <p className="alert alert-info">{message}</p>}

          <div className="auth-footer">
            {isLogin ? (
              <>
                Don&apos;t have an account?{" "}
                <button type="button" onClick={() => setAuthMode("register")}>
                  Register
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button type="button" onClick={() => setAuthMode("login")}>
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="app">
      <div className="dashboard-wrapper">
        <header className="navbar">
          <h2 className="navbar-title">Products Dashboard</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span className="navbar-subtitle">
              {user.fullName} ({user.role})
            </span>
            <button className="btn btn-outline" onClick={logout}>
              Logout
            </button>
          </div>
        </header>

        {message && <p className="alert alert-info">{message}</p>}

        <div className="grid">
          <div className="card">
            <h3>{editingId ? "Edit Product" : "Create Product"}</h3>
            {user.role !== "admin" && (
              <p className="text-muted">
                Only <b>admin</b> can create / edit / delete products.
              </p>
            )}
            {user.role === "admin" && (
              <form className="form" onSubmit={submitProduct}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    name="title"
                    className="input"
                    value={productForm.title}
                    onChange={handleProductChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Amount</label>
                  <input
                    name="amount"
                    type="number"
                    className="input"
                    value={productForm.amount}
                    onChange={handleProductChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input
                    name="category"
                    className="input"
                    value={productForm.category}
                    onChange={handleProductChange}
                    required
                  />
                </div>
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="isAvailable"
                      checked={productForm.isAvailable}
                      onChange={handleProductChange}
                    />{" "}
                    Available
                  </label>
                </div>
                <div className="btn-row">
                  <button className="btn btn-primary" type="submit">
                    {editingId ? "Update" : "Create"}
                  </button>
                  {editingId && (
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>

          <div className="card">
            <div className="card-header-row">
              <h3>Products</h3>
              <button className="btn btn-outline" onClick={fetchProducts}>
                Refresh
              </button>
            </div>
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th className="text-right">Amount</th>
                    <th>Available</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">
                        No products yet
                      </td>
                    </tr>
                  )}
                  {products.map((p) => (
                    <tr key={p._id}>
                      <td>{p.title}</td>
                      <td>{p.category}</td>
                      <td className="text-right">{p.amount}</td>
                      <td>{p.isAvailable ? "Yes" : "No"}</td>
                      <td className="text-center">
                        {user.role === "admin" ? (
                          <>
                            <button
                              className="btn btn-small"
                              onClick={() => startEditProduct(p)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-small btn-danger"
                              onClick={() => deleteProduct(p._id)}
                            >
                              Delete
                            </button>
                          </>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
