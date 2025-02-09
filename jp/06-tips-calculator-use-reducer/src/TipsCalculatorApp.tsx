import { Header } from "./components/Header";
import { menuItems } from "./services/db.service";
import OrdersContent from "./components/OrdersContent";
import MenuItem from "./components/MenuItem";
import OrderTotals from "./components/OrderTotals";
import TipPercentageForm from "./components/TipPercentageForm";
import { useReducer } from "react";
import { orderReducer, orderReducerInitialState } from "./reducers/order.reducer";

const TipsCalculatorApp = () => {
  const [state, dispatch] = useReducer(orderReducer, orderReducerInitialState);

  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto py-20 md:grid grid-cols-2">
        <div className="p-5">
          <h2 className="text-4xl font-black">Menu</h2>
          <div className="space-y-3 mt-10">
            {menuItems.map((product) => (
              <MenuItem key={product.id} product={product} dispatch={dispatch} />
            ))}
          </div>
        </div>
        <div>
          <div className="border border-dashed border-slate-300 rounded-lg p-5 space-y-10">
            {state.order.length > 0 ? (
              <>
                <OrdersContent order={state.order} dispatch={dispatch} />
                <TipPercentageForm tip={state.tip} dispatch={dispatch} />
                <OrderTotals order={state.order} tip={state.tip} dispatch={dispatch} />
              </>
            ) : (
              <p className="text-center">Order is empty</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default TipsCalculatorApp;
