import React, { useState, useEffect, useCallback } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'
import { Menu, Bell, Settings, ChevronLeft, ChevronDown, ChevronUp, Egg, Users, Calendar, ClipboardList, TrendingUp, Feather, Truck, ShoppingCart, AlertTriangle, Bird, Play, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const COLORS = ['#FFA000', '#FFB300', '#FFC107', '#FFCA28', '#FFD54F', '#FFE082']

const initialProductionData = [
  { date: '2024-01-01', eggs: 1000, feed: 300 },
  { date: '2024-01-02', eggs: 1100, feed: 320 },
  { date: '2024-01-03', eggs: 1050, feed: 310 },
  { date: '2024-01-04', eggs: 1200, feed: 330 },
  { date: '2024-01-05', eggs: 1150, feed: 325 },
]

const initialBirdDistributionData = [
  { name: 'Layers', value: 500 },
  { name: 'Broilers', value: 300 },
  { name: 'Breeders', value: 200 },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [isDrawerOpen, setIsDrawerOpen] = useState(true)
  const [birds, setBirds] = useState([
    { category: 'Layers', breed: 'Rhode Island Red', quantity: 500, age: '24 weeks', health: 'Healthy' },
    { category: 'Broilers', breed: 'Cornish Cross', quantity: 1000, age: '4 weeks', health: 'Healthy' },
  ])
  const [eggProduction, setEggProduction] = useState(initialProductionData)
  const [tasks, setTasks] = useState([
    { date: '2024-06-15', task: 'Feeding', assignee: 'John Doe', status: 'Pending' },
    { date: '2024-06-16', task: 'Cleaning', assignee: 'Jane Smith', status: 'Completed' },
  ])
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [activityLog, setActivityLog] = useState([
    { id: 1, message: 'System started', timestamp: new Date().toISOString() },
  ])

  // Simulation state
  const [simulationTime, setSimulationTime] = useState(0)
  const [isSimulationRunning, setIsSimulationRunning] = useState(false)
  const [simulatedEggProduction, setSimulatedEggProduction] = useState([])
  const [simulatedFeedConsumption, setSimulatedFeedConsumption] = useState([])
  const [health, setHealth] = useState(100)
  const [revenue, setRevenue] = useState(0)

  // New features
  const [weatherForecast, setWeatherForecast] = useState([
    { date: '2024-06-15', temperature: 25, humidity: 60, description: 'Sunny' },
    { date: '2024-06-16', temperature: 23, humidity: 65, description: 'Partly cloudy' },
    { date: '2024-06-17', temperature: 22, humidity: 70, description: 'Cloudy' },
  ])
  const [feedInventory, setFeedInventory] = useState(2000)
  const [marketPrices, setMarketPrices] = useState({ eggs: 80, chicken: 1000, feed: 200 })
  const [vaccinations, setVaccinations] = useState([
    { date: '2024-06-20', type: 'Newcastle Disease', batch: 'A1' },
    { date: '2024-07-05', type: 'Infectious Bronchitis', batch: 'B2' },
  ])
  const [suppliers, setSuppliers] = useState([
    { name: 'FeedCo', type: 'Feed', lastDelivery: '2024-06-10', nextDelivery: '2024-06-25' },
    { name: 'ChickInc', type: 'Chicks', lastDelivery: '2024-05-15', nextDelivery: '2024-07-15' },
  ])
  const [sales, setSales] = useState([
    { date: '2024-06-14', product: 'Eggs', quantity: 500, revenue: 40000 },
    { date: '2024-06-15', product: 'Chicken', quantity: 50, revenue: 50000 },
  ])
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'Low Feed', message: 'Feed inventory below 20%', timestamp: new Date().toISOString() },
    { id: 2, type: 'Health Check', message: 'Routine health check due', timestamp: new Date().toISOString() },
  ])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsDrawerOpen(true)
      } else {
        setIsDrawerOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const addBirds = useCallback((event) => {
    event.preventDefault()
    const newBird = {
      category: event.target.category.value,
      breed: event.target.breed.value,
      quantity: parseInt(event.target.quantity.value),
      age: '0 weeks',
      health: 'Healthy'
    }
    setBirds(prevBirds => [...prevBirds, newBird])
    addActivity(`Added ${newBird.quantity} ${newBird.breed} to ${newBird.category}`)
  }, [])

  const recordProduction = useCallback((event) => {
    event.preventDefault()
    const newProduction = {
      date: event.target.date.value,
      eggs: parseInt(event.target.eggCount.value),
      feed: 300 // Assuming constant feed for simplicity
    }
    setEggProduction(prevProduction => [...prevProduction, newProduction])
    addActivity(`Recorded ${newProduction.eggs} eggs for ${newProduction.date}`)
  }, [])

  const scheduleTask = useCallback((event) => {
    event.preventDefault()
    const newTask = {
      date: event.target.taskDate.value,
      task: event.target.taskType.value,
      assignee: event.target.assignee.value,
      status: 'Pending'
    }
    setTasks(prevTasks => [...prevTasks, newTask])
    addActivity(`Scheduled ${newTask.task} for ${newTask.date}`)
  }, [])

  const addActivity = useCallback((message) => {
    const newActivity = {
      id: activityLog.length + 1,
      message,
      timestamp: new Date().toISOString(),
    }
    setActivityLog(prevLog => [newActivity, ...prevLog])
  }, [activityLog.length])

  const toggleNotifications = useCallback(() => {
    setShowNotifications(prev => !prev)
    setShowSettings(false)
  }, [])

  const toggleSettings = useCallback(() => {
    setShowSettings(prev => !prev)
    setShowNotifications(false)
  }, [])

  const handleLogout = useCallback(() => {
    navigate('/')
  }, [navigate])

  // Simulation functions
  useEffect(() => {
    let interval
    if (isSimulationRunning) {
      interval = setInterval(() => {
        setSimulationTime(prevTime => prevTime + 1)
        simulateProduction()
        simulateFeedConsumption()
        simulateHealth()
        simulateRevenue()
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isSimulationRunning])

  const simulateProduction = useCallback(() => {
    const production = Math.floor(Math.random() * 10) + 90 // 90-100 eggs per hour
    setSimulatedEggProduction(prev => [...prev, { time: simulationTime, eggs: production }].slice(-10))
  }, [simulationTime])

  const simulateFeedConsumption = useCallback(() => {
    const consumption = Math.floor(Math.random() * 5) + 45 // 45-50 kg per hour
    setSimulatedFeedConsumption(prev => [...prev, { time: simulationTime, feed: consumption }].slice(-10))
    setFeedInventory(prev => Math.max(0, prev - consumption))
  }, [simulationTime])

  const simulateHealth = useCallback(() => {
    const healthChange = Math.random() > 0.8 ? -1 : 0 // 20% chance of health decrease
    setHealth(prev => Math.max(0, prev + healthChange))
    if (health < 80) {
      addActivity('Health Alert: Flock health is declining. Check immediately.')
    }
  }, [health, addActivity])

  const simulateRevenue = useCallback(() => {
    const eggPrice = marketPrices.eggs
    const feedCost = marketPrices.feed
    const latestEggProduction = simulatedEggProduction[simulatedEggProduction.length - 1]?.eggs || 0
    const latestFeedConsumption = simulatedFeedConsumption[simulatedFeedConsumption.length - 1]?.feed || 0
    const hourlyRevenue = (latestEggProduction * eggPrice) - (latestFeedConsumption * feedCost)
    setRevenue(prev => prev + hourlyRevenue)
  }, [marketPrices.eggs, marketPrices.feed, simulatedEggProduction, simulatedFeedConsumption])

  const updateMarketPrices = useCallback((event) => {
    event.preventDefault()
    const newPrices = {
      eggs: Number(event.target.eggPrice.value),
      chicken: Number(event.target.chickenPrice.value),
      feed: Number(event.target.feedPrice.value),
    }
    setMarketPrices(newPrices)
    addActivity('Market prices updated')
  }, [addActivity])

  const addVaccination = useCallback((event) => {
    event.preventDefault()
    const newVaccination = {
      date: event.target.vaccinationDate.value,
      type: event.target.vaccinationType.value,
      batch: event.target.vaccinationBatch.value,
    }
    setVaccinations(prev => [...prev, newVaccination])
    addActivity(`Added vaccination: ${newVaccination.type} for batch ${newVaccination.batch} on ${newVaccination.date}`)
  }, [addActivity])

  const addSupplier = useCallback((event) => {
    event.preventDefault()
    const newSupplier = {
      name: event.target.supplierName.value,
      type: event.target.supplierType.value,
      lastDelivery: event.target.lastDelivery.value,
      nextDelivery: event.target.nextDelivery.value,
    }
    setSuppliers(prev => [...prev, newSupplier])
    addActivity(`Added new supplier: ${newSupplier.name} for ${newSupplier.type}`)
  }, [addActivity])

  const addSale = useCallback((event) => {
    event.preventDefault()
    const newSale = {
      date: event.target.saleDate.value,
      product: event.target.saleProduct.value,
      quantity: Number(event.target.saleQuantity.value),
      revenue: Number(event.target.saleRevenue.value),
    }
    setSales(prev => [...prev, newSale])
    addActivity(`Recorded sale: ${newSale.quantity} ${newSale.product} for ₦${newSale.revenue}`)
  }, [addActivity])

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-amber-800">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-amber-50 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-amber-800 flex items-center">
                  <Bird className="mr-2" /> Total Birds
                </h3>
                <p className="text-3xl font-bold text-amber-600">{birds.reduce((sum, bird) => sum + bird.quantity, 0)}</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-amber-800 flex items-center">
                  <Egg className="mr-2" /> Egg Production
                </h3>
                <p className="text-3xl font-bold text-amber-600">{eggProduction[eggProduction.length - 1].eggs}</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-amber-800 flex items-center">
                  <TrendingUp className="mr-2" /> Feed Inventory
                </h3>
                <p className="text-3xl font-bold text-amber-600">{feedInventory} kg</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-amber-800 flex items-center">
                  <Feather className="mr-2" /> Revenue
                </h3>
                <p className="text-3xl font-bold text-amber-600">₦{revenue.toFixed(2)}</p>
              </div>
            </div>

            {/* Egg Production Trend */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-amber-800 mb-4">Egg Production Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={eggProduction}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="eggs" stroke="#FFA000" name="Eggs" />
                  <Line yAxisId="right" type="monotone" dataKey="feed" stroke="#FFB300" name="Feed (kg)" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Bird Distribution */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-amber-800 mb-4">Bird Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={initialBirdDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {initialBirdDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Task Overview */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-amber-800 mb-4 flex items-center">
                <ClipboardList className="mr-2" /> Task Overview
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={tasks}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="status" fill="#FFA000" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Simulated Egg Production */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-amber-800 mb-4">Simulated Egg Production</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={simulatedEggProduction}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="eggs" stroke="#FFA000" fill="#FFD54F" name="Eggs Produced" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Weather Forecast */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-amber-800 mb-4 flex items-center">
                <Calendar className="mr-2" /> Weather Forecast
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weatherForecast}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#FFA000" name="Temperature (°C)" />
                  <Line yAxisId="right" type="monotone" dataKey="humidity" stroke="#4CAF50" name="Humidity (%)" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Market Prices */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-amber-800 mb-4 flex items-center">
                <Feather className="mr-2" /> Market Prices
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[marketPrices]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="eggs" fill="#FFA000" name="Eggs (₦/egg)" />
                  <Bar dataKey="chicken" fill="#FFB300" name="Chicken (₦/kg)" />
                  <Bar dataKey="feed" fill="#FFC107" name="Feed (₦/kg)" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Vaccinations */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-amber-800 mb-4 flex items-center">
                <Feather className="mr-2" /> Upcoming Vaccinations
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-amber-100">
                      <th className="px-4 py-2 text-left">Date</th>
                      <th className="px-4 py-2 text-left">Type</th>
                      <th className="px-4 py-2 text-left">Batch</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vaccinations.map((vaccination, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-amber-50' : 'bg-white'}>
                        <td className="px-4 py-2">{vaccination.date}</td>
                        <td className="px-4 py-2">{vaccination.type}</td>
                        <td className="px-4 py-2">{vaccination.batch}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Suppliers */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-amber-800 mb-4 flex items-center">
                <Truck className="mr-2" /> Supplier Information
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-amber-100">
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Type</th>
                      <th className="px-4 py-2 text-left">Last Delivery</th>
                      <th className="px-4 py-2 text-left">Next Delivery</th>
                    </tr>
                  </thead>
                  <tbody>
                    {suppliers.map((supplier, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-amber-50' : 'bg-white'}>
                        <td className="px-4 py-2">{supplier.name}</td>
                        <td className="px-4 py-2">{supplier.type}</td>
                        <td className="px-4 py-2">{supplier.lastDelivery}</td>
                        <td className="px-4 py-2">{supplier.nextDelivery}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sales */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-amber-800 mb-4 flex items-center">
                <ShoppingCart className="mr-2" /> Recent Sales
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" /> or
                  <Legend />
                  <Bar yAxisId="left" dataKey="quantity" fill="#FFA000" name="Quantity" />
                  <Bar yAxisId="right" dataKey="revenue" fill="#4CAF50" name="Revenue (₦)" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Alerts */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-amber-800 mb-4 flex items-center">
                <AlertTriangle className="mr-2" /> Active Alerts
              </h3>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className="bg-amber-50 p-4 rounded-lg flex items-start">
                    <AlertTriangle className="text-amber-600 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-amber-800">{alert.type}</h4>
                      <p className="text-amber-700">{alert.message}</p>
                      <p className="text-sm text-amber-600 mt-1">{new Date(alert.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case 'birds':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-amber-800">Bird Management</h2>
            <form onSubmit={addBirds} className="bg-white p-4 rounded-lg shadow space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select name="category" className="w-full p-2 border border-amber-300 rounded">
                  <option value="">Select category</option>
                  <option value="layers">Layers</option>
                  <option value="broilers">Broilers</option>
                  <option value="breeders">Breeders</option>
                </select>
                <input type="text" name="breed" placeholder="Enter breed" className="w-full p-2 border border-amber-300 rounded" />
                <input type="number" name="quantity" placeholder="Enter quantity" className="w-full p-2 border border-amber-300 rounded" />
              </div>
              <button type="submit" className="w-full bg-amber-500 text-white p-2 rounded hover:bg-amber-600 transition duration-300">Add Birds</button>
            </form>
            <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-amber-100">
                    <th className="p-2 text-left">Category</th>
                    <th className="p-2 text-left">Breed</th>
                    <th className="p-2 text-left">Quantity</th>
                    <th className="p-2 text-left">Age</th>
                    <th className="p-2 text-left">Health Status</th>
                  </tr>
                </thead>
                <tbody>
                  {birds.map((bird, index) => (
                    <tr key={index} className="border-b border-amber-200">
                      <td className="p-2">{bird.category}</td>
                      <td className="p-2">{bird.breed}</td>
                      <td className="p-2">{bird.quantity}</td>
                      <td className="p-2">{bird.age}</td>
                      <td className="p-2">{bird.health}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      case 'production':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-amber-800">Egg Production</h2>
            <form onSubmit={recordProduction} className="bg-white p-4 rounded-lg shadow space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="date" name="date" className="w-full p-2 border border-amber-300 rounded" />
                <select name="batch" className="w-full p-2 border border-amber-300 rounded">
                  <option value="">Select batch</option>
                  <option value="a1">Batch A1</option>
                  <option value="b2">Batch B2</option>
                  <option value="c3">Batch C3</option>
                </select>
                <input type="number" name="eggCount" placeholder="Enter egg count" className="w-full p-2 border border-amber-300 rounded" />
              </div>
              <button type="submit" className="w-full bg-amber-500 text-white p-2 rounded hover:bg-amber-600 transition duration-300">Record Production</button>
            </form>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-amber-800 mb-4">Production History</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={eggProduction}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="eggs" fill="#FFA000" name="Eggs Produced" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )
      case 'tasks':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-amber-800">Task Scheduling</h2>
            <form onSubmit={scheduleTask} className="bg-white p-4 rounded-lg shadow space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="date" name="taskDate" className="w-full p-2 border border-amber-300 rounded" />
                <select name="taskType" className="w-full p-2 border border-amber-300 rounded">
                  <option value="">Select task type</option>
                  <option value="feeding">Feeding</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="health-check">Health Check</option>
                </select>
                <input type="text" name="assignee" placeholder="Enter assignee name" className="w-full p-2 border border-amber-300 rounded" />
              </div>
              <button type="submit" className="w-full bg-amber-500 text-white p-2 rounded hover:bg-amber-600 transition duration-300">Schedule Task</button>
            </form>
            <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-amber-100">
                    <th className="p-2 text-left">Date</th>
                    <th className="p-2 text-left">Task</th>
                    <th className="p-2 text-left">Assignee</th>
                    <th className="p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, index) => (
                    <tr key={index} className="border-b border-amber-200">
                      <td className="p-2">{task.date}</td>
                      <td className="p-2">{task.task}</td>
                      <td className="p-2">{task.assignee}</td>
                      <td className="p-2">{task.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      case 'simulation':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-amber-800">Simulation</h2>
            <div className="flex justify-between items-center">
              <button 
                onClick={() => setIsSimulationRunning(!isSimulationRunning)}
                className={`px-4 py-2 rounded ${isSimulationRunning ? 'bg-amber-600' : 'bg-amber-500'} text-white hover:bg-amber-600 transition duration-300`}
              >
                {isSimulationRunning ? 'Pause' : 'Start'} Simulation
              </button>
              <div className="text-amber-800">
                Simulation Time: {simulationTime} hours
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-amber-50 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-amber-800">Egg Production</h3>
                <p className="text-3xl font-bold text-amber-600">{simulatedEggProduction[simulatedEggProduction.length - 1]?.eggs || 0} eggs/hour</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-amber-800">Feed Consumption</h3>
                <p className="text-3xl font-bold text-amber-600">{simulatedFeedConsumption[simulatedFeedConsumption.length - 1]?.feed || 0} kg/hour</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-amber-800">Flock Health</h3>
                <p className="text-3xl font-bold text-amber-600">{health}%</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-amber-800">Revenue</h3>
                <p className="text-3xl font-bold text-amber-600">₦{revenue.toFixed(2)}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-amber-800 mb-4">Simulated Egg Production</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={simulatedEggProduction}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="eggs" stroke="#FFA000" name="Eggs Produced" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )
      case 'market':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-amber-800">Market Information</h2>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-amber-800 mb-4">Current Market Prices</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-amber-800">Eggs</h4>
                  <p className="text-3xl font-bold text-amber-600">₦{marketPrices.eggs.toFixed(2)}/egg</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-amber-800">Chicken</h4>
                  <p className="text-3xl font-bold text-amber-600">₦{marketPrices.chicken.toFixed(2)}/kg</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-amber-800">Feed</h4>
                  <p className="text-3xl font-bold text-amber-600">₦{marketPrices.feed.toFixed(2)}/kg</p>
                </div>
              </div>
              <form onSubmit={updateMarketPrices} className="mt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input type="number" name="eggPrice" placeholder="New egg price" className="w-full p-2 border border-amber-300 rounded" step="0.01" />
                  <input type="number" name="chickenPrice" placeholder="New chicken price" className="w-full p-2 border border-amber-300 rounded" step="0.01" />
                  <input type="number" name="feedPrice" placeholder="New feed price" className="w-full p-2 border border-amber-300 rounded" step="0.01" />
                </div>
                <button type="submit" className="w-full bg-amber-500 text-white p-2 rounded hover:bg-amber-600 transition duration-300">
                  Update Market Prices
                </button>
              </form>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-amber-800 mb-4">Weather Forecast</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {weatherForecast.map((day, index) => (
                  <div key={index} className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-amber-800">{day.date}</h4>
                    <p className="text-amber-600">{day.description}</p>
                    <p className="text-amber-600">Temp: {day.temperature}°C</p>
                    <p className="text-amber-600">Humidity: {day.humidity}%</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case 'vaccinations':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-amber-800">Vaccination Schedule</h2>
            <form onSubmit={addVaccination} className="bg-white p-4 rounded-lg shadow space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="date" name="vaccinationDate" className="w-full p-2 border border-amber-300 rounded" required />
                <input type="text" name="vaccinationType" placeholder="Vaccination Type" className="w-full p-2 border border-amber-300 rounded" required />
                <input type="text" name="vaccinationBatch" placeholder="Batch" className="w-full p-2 border border-amber-300 rounded" required />
              </div>
              <button type="submit" className="w-full bg-amber-500 text-white p-2 rounded hover:bg-amber-600 transition duration-300">Add Vaccination</button>
            </form>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-amber-800 mb-4">Upcoming Vaccinations</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-amber-100">
                      <th className="px-4 py-2 text-left">Date</th>
                      <th className="px-4 py-2 text-left">Type</th>
                      <th className="px-4 py-2 text-left">Batch</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vaccinations.map((vaccination, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-amber-50' : 'bg-white'}>
                        <td className="px-4 py-2">{vaccination.date}</td>
                        <td className="px-4 py-2">{vaccination.type}</td>
                        <td className="px-4 py-2">{vaccination.batch}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
      case 'suppliers':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-amber-800">Supplier Management</h2>
            <form onSubmit={addSupplier} className="bg-white p-4 rounded-lg shadow space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="supplierName" placeholder="Supplier Name" className="w-full p-2 border border-amber-300 rounded" required />
                <input type="text" name="supplierType" placeholder="Supplier Type" className="w-full p-2 border border-amber-300 rounded" required />
                <input type="date" name="lastDelivery" className="w-full p-2 border border-amber-300 rounded" required />
                <input type="date" name="nextDelivery" className="w-full p-2 border border-amber-300 rounded" required />
              </div>
              <button type="submit" className="w-full bg-amber-500 text-white p-2 rounded hover:bg-amber-600 transition duration-300">Add Supplier</button>
            </form>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-amber-800 mb-4">Supplier Information</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-amber-100">
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Type</th>
                      <th className="px-4 py-2 text-left">Last Delivery</th>
                      <th className="px-4 py-2 text-left">Next Delivery</th>
                    </tr>
                  </thead>
                  <tbody>
                    {suppliers.map((supplier, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-amber-50' : 'bg-white'}>
                        <td className="px-4 py-2">{supplier.name}</td>
                        <td className="px-4 py-2">{supplier.type}</td>
                        <td className="px-4 py-2">{supplier.lastDelivery}</td>
                        <td className="px-4 py-2">{supplier.nextDelivery}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
      case 'sales':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-amber-800">Sales Analytics</h2>
            <form onSubmit={addSale} className="bg-white p-4 rounded-lg shadow space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <input type="date" name="saleDate" className="w-full p-2 border border-amber-300 rounded" required />
                <input type="text" name="saleProduct" placeholder="Product" className="w-full p-2 border border-amber-300 rounded" required />
                <input type="number" name="saleQuantity" placeholder="Quantity" className="w-full p-2 border border-amber-300 rounded" required />
                <input type="number" name="saleRevenue" placeholder="Revenue (₦)" className="w-full p-2 border border-amber-300 rounded" required />
              </div>
              <button type="submit" className="w-full bg-amber-500 text-white p-2 rounded hover:bg-amber-600 transition duration-300">Record Sale</button>
            </form>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-amber-800 mb-4">Recent Sales</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="quantity" fill="#FFA000" name="Quantity" />
                  <Bar yAxisId="right" dataKey="revenue" fill="#4CAF50" name="Revenue (₦)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )
      case 'alerts':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-amber-800">System Alerts</h2>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-amber-800 mb-4">Active Alerts</h3>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className="bg-amber-50 p-4 rounded-lg flex items-start">
                    <AlertTriangle className="text-amber-600 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-amber-800">{alert.type}</h4>
                      <p className="text-amber-700">{alert.message}</p>
                      <p className="text-sm text-amber-600 mt-1">{new Date(alert.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      default:
        return <div>Select a tab</div>
    }
  }

  return (
    <div className="min-h-screen bg-amber-100 flex flex-col md:flex-row">
      <div className={`fixed inset-y-0 left-0 transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out md:flex md:flex-col md:justify-between z-30`}>
        <div className="w-64 bg-amber-800 text-white p-4 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Menu</h2>
            <button onClick={() => setIsDrawerOpen(false)} className="md:hidden">
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>
          <nav>
            <ul className="space-y-2">
              {[
                { name: 'Overview', icon: <Users className="mr-2" /> },
                { name: 'Birds', icon: <Bird className="mr-2" /> },
                { name: 'Production', icon: <TrendingUp className="mr-2" /> },
                { name: 'Tasks', icon: <ClipboardList className="mr-2" /> },
                { name: 'Simulation', icon: <Play className="mr-2" /> },
                { name: 'Market', icon: <Feather className="mr-2" /> },
                { name: 'Vaccinations', icon: <Feather className="mr-2" /> },
                { name: 'Suppliers', icon: <Truck className="mr-2" /> },
                { name: 'Sales', icon: <ShoppingCart className="mr-2" /> },
                { name: 'Alerts', icon: <AlertTriangle className="mr-2" /> },
              ].map((item) => (
                <li key={item.name.toLowerCase()}>
                  <button
                    onClick={() => {
                      setActiveTab(item.name.toLowerCase())
                      setIsDrawerOpen(false)
                    }}
                    className={`w-full text-left py-2 px-4 rounded flex items-center ${
                      activeTab === item.name.toLowerCase() ? 'bg-amber-700' : 'hover:bg-amber-700'
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="bg-amber-800 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <button onClick={() => setIsDrawerOpen(!isDrawerOpen)} className="mr-4 md:hidden">
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-2xl font-bold flex items-center">
                <Egg className="mr-2" />
                Eggcellent
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={toggleNotifications} className="relative">
                <Bell className="h-6 w-6" />
                {activityLog.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {activityLog.length}
                  </span>
                )}
              </button>
              <button onClick={toggleSettings}>
                <Settings className="h-6 w-6" />
              </button>
            </div>
          </div>
        </header>

        {showNotifications && (
          <div className="absolute right-4 top-16 w-64 bg-white rounded-lg shadow-lg z-50">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
              {activityLog.slice(0, 5).map((activity) => (
                <div key={activity.id} className="mb-2">
                  <p className="text-sm">{activity.message}</p>
                  <small className="text-gray-500">{new Date(activity.timestamp).toLocaleString()}</small>
                </div>
              ))}
            </div>
          </div>
        )}

        {showSettings && (
          <div className="absolute right-4 top-16 w-64 bg-white rounded-lg shadow-lg z-50">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Settings</h3>
              <button onClick={handleLogout} className="w-full bg-amber-500 text-white p-2 rounded hover:bg-amber-600 transition duration-300 flex items-center justify-center">
                <LogOut className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        )}

        <main className="flex-1 p-4 overflow-y-auto">
          <div className="container mx-auto">
            {renderContent()}
          </div>
        </main>

        <footer className="bg-amber-800 text-white p-4">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 Eggcellent. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

