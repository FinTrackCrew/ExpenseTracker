import { useEffect, useState } from "react";

import api from "../services/api";

import {
  Bar,
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import SavingsGoalModal from "./SavingsGoalModal";

import {
  pageBackground,
  pageWrapper,
  headingClass,
  bodyText,
  glassCard,
  primaryBtn,
  inputClass,
  alertDanger,
  alertSuccess,
} from "../styles/common";

import {
  useMonthStore,
} from "../store/monthStore";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function Savings() {

  const {
    selectedDate,
    setSelectedDate,
  } = useMonthStore();

  const [
    selectedSavings,
    setSelectedSavings,
  ] = useState(null);

  const [
    goal,
    setGoal,
  ] = useState(null);

  const [
    savingsAlert,
    setSavingsAlert,
  ] = useState(null);

  const [
    showGoalModal,
    setShowGoalModal,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const fetchSavingsData =
    async () => {

      try {

        setLoading(true);

        const selectedMonth =
          selectedDate.slice(
            0,
            7
          );

        const [
          selectedSavingsRes,
          goalRes,
          alertRes,
        ] = await Promise.all([

          api.get(
            "/saving-api/get-savings",
            {
              params: {
                month:
                  selectedMonth,
              },
            }
          ),

          api.get(
            "/saving-api/goal",
            {
              params: {
                month:
                  selectedMonth,
              },
            }
          ),

          api.get(
            "/alert-api/savingsAlert",
            {
              params: {
                month:
                  selectedMonth,
              },
            }
          ),
        ]);

        setSelectedSavings(
          selectedSavingsRes
            .data.payload
        );

        setGoal(
          goalRes.data.payload
        );

        setSavingsAlert(
          alertRes.data
        );

      } catch (err) {

        console.error(
          "Fetching savings failed:",
          err
        );

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    fetchSavingsData();

  }, [selectedDate]);

  const totalIncome =
    Number(
      selectedSavings
        ?.totalIncome || 0
    );

  const totalSavings =
    Number(
      selectedSavings
        ?.totalSavings || 0
    );

  const savingsGoal =
    Number(
      goal?.savingsGoal || 0
    );

  if (loading) {

    return (
      <div
        className={`${pageBackground} flex items-center justify-center`}
      >

        <p className="text-cyan-600 text-lg animate-pulse">
          Loading savings...
        </p>
      </div>
    );
  }

  return (
    <div className={pageBackground}>

      <div
        className={`${pageWrapper} space-y-8`}
      >

        {showGoalModal && (

          <SavingsGoalModal
            selectedMonth={
              selectedDate.slice(
                0,
                7
              )
            }

            goal={goal}

            onClose={() =>
              setShowGoalModal(
                false
              )
            }

            onGoalChanged={
              fetchSavingsData
            }
          />
        )}

        {/* TOP BAR */}
        <div className="mb-8">

          <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-5">

            {/* LEFT */}
            <div>

              <h1
                className={
                  headingClass
                }
              >
                Savings Overview
              </h1>

              <p
                className={`${bodyText} mt-2`}
              >
                Track your
                monthly income
                and savings goals
              </p>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">

              <div>

                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Select Date
                </label>

                <input
                  type="date"

                  value={
                    selectedDate
                  }

                  onChange={(
                    e
                  ) =>
                    setSelectedDate(
                      e.target
                        .value
                    )
                  }

                  className={`${inputClass} min-w-[200px]`}
                />
              </div>

              <button
                type="button"

                onClick={() =>
                  setShowGoalModal(
                    true
                  )
                }

                className={`${primaryBtn} h-[48px] px-5`}
              >
                Savings Goal
              </button>
            </div>
          </div>
        </div>

        {/* CHART + INSIGHT */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* CHART CARD */}
          <div className={`${glassCard} flex flex-col`}>

            <h2 className="text-xl font-semibold text-slate-800 mb-5">
              Savings Comparison
            </h2>

            <div className="flex-1 h-[380px]">

              <Bar
                data={{

                  labels: [
                    "Income",
                    "Savings",
                    "Savings Goal",
                  ],

                  datasets: [
                    {
                      data: [
                        totalIncome,
                        totalSavings,
                        savingsGoal,
                      ],

                      backgroundColor: [

                        "rgba(6,182,212,0.75)",

                        totalSavings >=
                        savingsGoal

                          ? "rgba(34,197,94,0.75)"

                          : "rgba(234,179,8,0.75)",

                        "rgba(99,102,241,0.75)",
                      ],

                      borderColor: [

                        "#06b6d4",

                        totalSavings >=
                        savingsGoal

                          ? "#22c55e"

                          : "#eab308",

                        "#6366f1",
                      ],

                      borderWidth: 2,

                      borderRadius: 12,

                      barThickness: 30,
                    },
                  ],
                }}

                options={{

                  indexAxis: "y",

                  responsive: true,

                  maintainAspectRatio:
                    false,

                  plugins: {

                    legend: {
                      display: false,
                    },

                    tooltip: {

                      backgroundColor:
                        "#0f172a",

                      padding: 12,

                      callbacks: {

                        label: function(
                          context
                        ) {

                          return `₹${context.raw.toLocaleString()}`;
                        },
                      },
                    },
                  },

                  scales: {

                    x: {

                      beginAtZero: true,

                      grid: {

                        color:
                          "rgba(148,163,184,0.15)",
                      },

                      ticks: {

                        color:
                          "#475569",

                        callback: function(
                          value
                        ) {

                          return `₹${value}`;
                        },
                      },
                    },

                    y: {

                      grid: {
                        display: false,
                      },

                      ticks: {

                        color:
                          "#334155",

                        font: {
                          size: 13,
                          weight: "600",
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* INSIGHT CARD */}
          <div className={`${glassCard} flex flex-col`}>

            <h2 className="text-xl font-semibold text-slate-800 mb-5">
              Savings Goal Insight
            </h2>

            <div className="space-y-5">

              {/* INCOME */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">

                <p className="text-sm text-slate-500 mb-2">
                  Monthly Income
                </p>

                <h3 className="text-3xl font-bold text-cyan-600">
                  ₹
                  {totalIncome.toLocaleString()}
                </h3>
              </div>

              {/* CURRENT SAVINGS */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">

                <p className="text-sm text-slate-500 mb-2">
                  Current Savings
                </p>

                <h3 className="text-3xl font-bold text-green-600">
                  ₹
                  {totalSavings.toLocaleString()}
                </h3>
              </div>

              {/* SAVINGS GOAL */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">

                <p className="text-sm text-slate-500 mb-2">
                  Savings Goal
                </p>

                <h3 className="text-3xl font-bold text-indigo-600">
                  ₹
                  {savingsGoal.toLocaleString()}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* STATUS MESSAGE */}
        <div>

          {savingsGoal > 0 ? (

            (() => {

              const today =
                new Date();

              const selectedMonthDate =
                new Date(
                  selectedDate
                );

              const isMonthCompleted =

                today.getFullYear() >
                selectedMonthDate.getFullYear()

                ||

                (
                  today.getFullYear() ===
                  selectedMonthDate.getFullYear()

                  &&

                  today.getMonth() >
                  selectedMonthDate.getMonth()
                );

              const isGoalReached =
                totalSavings >=
                savingsGoal;

              if (
                isMonthCompleted
              ) {

                return isGoalReached ? (

                  <div className="bg-green-50 border border-green-200 rounded-2xl p-5">

                    <p className="text-green-700 font-semibold text-lg">
                      🎉 Goal Achieved!
                    </p>

                    <p className="text-green-600 text-sm mt-2">
                      You successfully achieved your savings goal for this month.
                    </p>
                  </div>

                ) : (

                  <div className="bg-red-50 border border-red-200 rounded-2xl p-5">

                    <p className="text-red-700 font-semibold text-lg">
                      ⚠️ Goal Not Reached
                    </p>

                    <p className="text-red-600 text-sm mt-2">

                      ₹
                      {(
                        savingsGoal -
                        totalSavings
                      ).toLocaleString()}

                      {" "}
                      short from your savings goal.
                    </p>
                  </div>
                );
              }

              return isGoalReached ? (

                <div className="bg-green-50 border border-green-200 rounded-2xl p-5">

                  <p className="text-green-700 font-semibold text-lg">
                    Savings Goal is Safe
                  </p>

                  <p className="text-green-600 text-sm mt-2">
                    Your current savings are above your goal so far this month.
                  </p>
                </div>

              ) : (

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">

                  <p className="text-amber-700 font-semibold text-lg">
                    Keep Going 
                  </p>

                  <p className="text-amber-600 text-sm mt-2">

                    ₹
                    {(
                      savingsGoal -
                      totalSavings
                    ).toLocaleString()}

                    {" "}
                    more needed to achieve your goal.
                  </p>
                </div>
              );
            })()

          ) : (

            <div className="bg-slate-100 border border-slate-200 rounded-2xl p-5">

              <p className="text-slate-700 font-semibold text-lg">
                No Goal Added
              </p>

              <p className="text-slate-500 text-sm mt-2">
                Add a savings goal to track your financial progress.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Savings;