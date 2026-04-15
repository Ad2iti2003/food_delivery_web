import React, { useState, useEffect } from "react";
import {
  Typography, Button, Box, Paper, Chip,
  TextField, Radio, RadioGroup, FormControlLabel,
  FormControl, FormLabel, IconButton, Alert,
  CircularProgress, Divider
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import StarIcon from "@mui/icons-material/Star";

function Payments() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [showForm, setShowForm]             = useState(false);
  const [methodType, setMethodType]         = useState("card");
  const [cardNumber, setCardNumber]         = useState("");
  const [cardHolder, setCardHolder]         = useState("");
  const [upiId, setUpiId]                   = useState("");
  const [loading, setLoading]               = useState(false);
  const [error, setError]                   = useState("");
  const [success, setSuccess]               = useState("");

  const token   = localStorage.getItem("token");
  const headers = {
    "Content-Type":  "application/json",
    "Authorization": `Bearer ${token}`
  };

  // ✅ Load payment methods from user
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.paymentMethods) {
      setPaymentMethods(storedUser.paymentMethods);
    }
  }, []);

  // ✅ Add payment method via Razorpay verification
  const handleAddMethod = async () => {
    setError("");
    setSuccess("");

    if (methodType === "card") {
      if (!cardNumber || cardNumber.length < 16) {
        setError("Please enter a valid 16-digit card number");
        return;
      }
      if (!cardHolder.trim()) {
        setError("Please enter card holder name");
        return;
      }
    }

    if (methodType === "upi") {
      if (!upiId.includes("@")) {
        setError("Please enter a valid UPI ID (e.g. name@upi)");
        return;
      }
    }

    try {
      setLoading(true);

      // ✅ Create small Razorpay order for verification (₹1)
      const orderRes = await fetch(
        "http://localhost:5000/api/payment/create-order",
        {
          method:  "POST",
          headers,
          body:    JSON.stringify({ amount: 1 })
        }
      );
      const razorpayOrder = await orderRes.json();

      const storedUser = JSON.parse(localStorage.getItem("user"));

      // ✅ Open Razorpay for verification
      const options = {
        key:         process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount:      razorpayOrder.amount,
        currency:    "INR",
        name:        "FoodWagon",
        description: "Payment method verification (₹1 refundable)",
        order_id:    razorpayOrder.id,
        handler: async (response) => {
          try {
            // ✅ Save payment method to profile
            const saveRes = await fetch(
              "http://localhost:5000/api/payment/save-method",
              {
                method:  "POST",
                headers,
                body:    JSON.stringify({
                  type:       methodType,
                  last4:      methodType === "card" ? cardNumber.slice(-4) : "",
                  upiId:      methodType === "upi"  ? upiId : "",
                  cardHolder: methodType === "card" ? cardHolder : ""
                })
              }
            );
            const saveData = await saveRes.json();

            if (saveData.paymentMethods) {
              setPaymentMethods(saveData.paymentMethods);
              // ✅ update localStorage
              const updatedUser = {
                ...storedUser,
                paymentMethods: saveData.paymentMethods
              };
              localStorage.setItem("user", JSON.stringify(updatedUser));
            }

            setSuccess("✅ Payment method added successfully!");
            setShowForm(false);
            setCardNumber("");
            setCardHolder("");
            setUpiId("");
          } catch {
            setError("Failed to save payment method.");
          }
        },
        prefill: {
          name:  storedUser?.name  || "",
          email: storedUser?.email || ""
        },
        theme: { color: "#FF8C00" }
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => {
        setError("Payment verification failed. Please try again.");
      });
      rzp.open();

    } catch (err) {
      setError("Failed to initiate verification.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete payment method
  const handleDelete = async (methodId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/payment/delete-method/${methodId}`,
        { method: "DELETE", headers }
      );
      const data = await res.json();
      setPaymentMethods(data.paymentMethods);

      // ✅ update localStorage
      const storedUser = JSON.parse(localStorage.getItem("user"));
      localStorage.setItem("user", JSON.stringify({
        ...storedUser,
        paymentMethods: data.paymentMethods
      }));
      setSuccess("Payment method removed.");
    } catch {
      setError("Failed to remove payment method.");
    }
  };

  return (
    <>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Saved Payment Methods
      </Typography>

      {error   && <Alert severity="error"   sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      {/* Saved Methods List */}
      {paymentMethods.length === 0 ? (
        <Typography sx={{ color: "#777", mb: 3 }}>
          No saved payment methods yet.
        </Typography>
      ) : (
        paymentMethods.map((method) => (
          <Paper key={method._id} sx={{
            p: 2, mb: 2, display: "flex",
            alignItems: "center", justifyContent: "space-between",
            border: method.isPrimary ? "1px solid #ff9800" : "1px solid #eee",
            borderRadius: 2
          }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {method.type === "card"
                ? <CreditCardIcon sx={{ color: "#1976d2", fontSize: 32 }} />
                : <AccountBalanceIcon sx={{ color: "#4caf50", fontSize: 32 }} />
              }
              <Box>
                {method.type === "card" ? (
                  <>
                    <Typography fontWeight={600}>
                      •••• •••• •••• {method.last4}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {method.cardHolder}
                    </Typography>
                  </>
                ) : (
                  <Typography fontWeight={600}>{method.upiId}</Typography>
                )}
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {method.isPrimary && (
                <Chip
                  icon={<StarIcon />}
                  label="Primary"
                  size="small"
                  color="warning"
                />
              )}
              <Chip
                label={method.type === "card" ? "Card" : "UPI"}
                size="small"
                color={method.type === "card" ? "primary" : "success"}
              />
              <IconButton
                color="error"
                size="small"
                onClick={() => handleDelete(method._id)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Paper>
        ))
      )}

      {/* Add Payment Method Form */}
      {showForm ? (
        <Paper sx={{ p: 3, borderRadius: 2, border: "1px solid #eee" }}>
          <Typography fontWeight={600} mb={2}>
            Add New Payment Method
          </Typography>

          <FormControl sx={{ mb: 3 }}>
            <FormLabel>Method Type</FormLabel>
            <RadioGroup
              row
              value={methodType}
              onChange={(e) => setMethodType(e.target.value)}
            >
              <FormControlLabel
                value="card" control={<Radio color="warning" />}
                label="Credit / Debit Card"
              />
              <FormControlLabel
                value="upi" control={<Radio color="warning" />}
                label="UPI"
              />
            </RadioGroup>
          </FormControl>

          {methodType === "card" ? (
            <>
              <TextField
                fullWidth
                label="Card Number"
                value={cardNumber}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 16);
                  setCardNumber(val);
                }}
                placeholder="1234 5678 9012 3456"
                sx={{ mb: 2 }}
                inputProps={{ maxLength: 16 }}
              />
              <TextField
                fullWidth
                label="Card Holder Name"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                sx={{ mb: 2 }}
              />
            </>
          ) : (
            <TextField
              fullWidth
              label="UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="yourname@upi"
              sx={{ mb: 2 }}
            />
          )}

          <Divider sx={{ mb: 2 }} />

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            ₹1 will be charged for verification and refunded immediately.
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              onClick={handleAddMethod}
              disabled={loading}
              sx={{ backgroundColor: "#ff9800" }}
            >
              {loading
                ? <CircularProgress size={20} color="inherit" />
                : "Verify & Save"
              }
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setShowForm(false);
                setError("");
                setCardNumber("");
                setCardHolder("");
                setUpiId("");
              }}
            >
              Cancel
            </Button>
          </Box>
          
        </Paper>
      ) : (
        <Button
          variant="contained"
          onClick={() => setShowForm(true)}
          sx={{ backgroundColor: "#ff9800", textTransform: "none" }}
        >
          + Add Payment Method
        </Button>
      )}
    </>
  );
}

export default Payments;