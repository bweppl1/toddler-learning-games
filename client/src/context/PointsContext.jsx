import { createContext, useReducer, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const PointsContext = createContext();

export const pointsReducer = (state, action) => {
  switch (action.type) {
    case "SET_POINTS":
      return {
        ...state,
        points: action.payload,
        totalPoints:
          action.payload.mathPoints +
          action.payload.typingPoints +
          action.payload.spellingPoints,
        loading: false,
      };
    case "UPDATE_MATH_POINTS":
      return {
        ...state,
        points: {
          ...state.points,
          mathPoints: state.points.mathPoints + action.payload,
        },
        totalPoints: state.totalPoints + action.payload,
      };
    case "UPDATE_TYPING_POINTS":
      return {
        ...state,
        points: {
          ...state.points,
          typingPoints: state.points.typingPoints + action.payload,
        },
        totalPoints: state.totalPoints + action.payload,
      };
    case "UPDATE_SPELLING_POINTS":
      return {
        ...state,
        points: {
          ...state.points,
          spellingPoints: state.points.spellingPoints + action.payload,
        },
        totalPoints: state.totalPoints + action.payload,
      };
    case "RESET_POINTS":
      return {
        ...state,
        points: {
          mathPoints: 0,
          typingPoints: 0,
          spellingPoints: 0,
        },
        totalPoints: 0,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const PointsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pointsReducer, {
    points: {
      mathPoints: 0,
      typingPoints: 0,
      spellingPoints: 0,
    },
    totalPoints: 0,
    loading: false,
    error: null,
  });

  const { user } = useAuthContext();

  // Fetch points when user logs in
  useEffect(() => {
    if (user && user.token) {
      fetchUserPoints();
    } else {
      // Reset points when user logs out
      dispatch({ type: "RESET_POINTS" });
    }
  }, [user]);

  const fetchUserPoints = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await fetch("http://localhost:4000/api/user/points", {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch points");
      }

      const data = await response.json();
      dispatch({ type: "SET_POINTS", payload: data.points });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const updateMathPoints = async (points) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/user/points/math",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ points }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update math points");
      }

      dispatch({ type: "UPDATE_MATH_POINTS", payload: points });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const updateTypingPoints = async (points) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/user/points/typing",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ points }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update typing points");
      }

      dispatch({ type: "UPDATE_TYPING_POINTS", payload: points });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const updateSpellingPoints = async (points) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/user/points/spelling",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ points }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update spelling points");
      }

      dispatch({ type: "UPDATE_SPELLING_POINTS", payload: points });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const resetAllPoints = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/user/points/reset",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to reset points");
      }

      dispatch({ type: "RESET_POINTS" });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  return (
    <PointsContext.Provider
      value={{
        ...state,
        updateMathPoints,
        updateTypingPoints,
        updateSpellingPoints,
        resetAllPoints,
        fetchUserPoints,
      }}
    >
      {children}
    </PointsContext.Provider>
  );
};
