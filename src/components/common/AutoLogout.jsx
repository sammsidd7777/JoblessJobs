import { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useLogoutUserMutation } from "../../RTK/AuthService";
import { toast } from "react-toastify";

const INACTIVITY_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

const AutoLogout = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [logoutUser] = useLogoutUserMutation();
  const timerRef = useRef(null);

  const handleLogout = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      await logoutUser().unwrap();
    } catch (error) {
      console.error("Auto logout API failed:", error);
    } finally {
      dispatch(logout());
      localStorage.removeItem("lastActivityTime");
      toast.info("You have been logged out due to inactivity.");
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }
  }, [isAuthenticated, logoutUser, dispatch]);

  const resetTimer = useCallback(() => {
    if (!isAuthenticated) return;
    
    const now = Date.now();
    localStorage.setItem("lastActivityTime", now.toString());

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    timerRef.current = setTimeout(() => {
      const lastActivity = parseInt(localStorage.getItem("lastActivityTime") || "0", 10);
      if (Date.now() - lastActivity >= INACTIVITY_TIME) {
        handleLogout();
      }
    }, INACTIVITY_TIME);
  }, [isAuthenticated, handleLogout]);

  useEffect(() => {
    if (!isAuthenticated) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    // Check on mount if already inactive (for when tab is closed and reopened)
    const lastActivityStr = localStorage.getItem("lastActivityTime");
    if (lastActivityStr) {
      const lastActivity = parseInt(lastActivityStr, 10);
      const now = Date.now();
      
      if (now - lastActivity >= INACTIVITY_TIME) {
        handleLogout();
        return;
      }
    }

    resetTimer();

    const events = ["mousemove", "keydown", "mousedown", "touchstart", "scroll", "click"];
    
    const handleUserActivity = () => {
       // Throttling to avoid too many localStorage writes (only write at most once per second)
       const currentLastActivity = parseInt(localStorage.getItem("lastActivityTime") || "0", 10);
       if (Date.now() - currentLastActivity > 1000) {
           resetTimer();
       }
    };

    events.forEach((event) => {
      window.addEventListener(event, handleUserActivity);
    });
    
    // Also listen to storage events to sync inactivity across multiple tabs
    const handleStorageChange = (e) => {
      if (e.key === "lastActivityTime") {
         const newActivityTime = parseInt(e.newValue || "0", 10);
         if (Date.now() - newActivityTime >= INACTIVITY_TIME) {
            handleLogout();
         } else {
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
               handleLogout();
            }, INACTIVITY_TIME - (Date.now() - newActivityTime));
         }
      }
    };
    
    window.addEventListener("storage", handleStorageChange);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [isAuthenticated, resetTimer, handleLogout]);

  return children;
};

export default AutoLogout;
