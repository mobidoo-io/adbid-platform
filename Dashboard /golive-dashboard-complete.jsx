// Полный код дашборда GoLive Analytics
// Этот файл содержит весь код приложения

import React, { useState } from 'react'
import { Bell, TrendingUp, TrendingDown, DollarSign, Target, Users, Calendar, AlertTriangle, CheckCircle, XCircle, ChevronDown, ChevronUp, Filter, X, Settings, HelpCircle, User, Apple, Smartphone, Plus, Clock, Pause, Play } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'
import { Input } from '@/components/ui/input.jsx'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu.jsx'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, AreaChart, Area } from 'recharts'
import './App.css'

// Данные приложений
const applications = [
  { id: 'golive-android', name: 'GoLive Android', icon: 'G', platforms: ['android'], status: 'active' },
  { id: 'ava-android', name: 'AVA android', icon: 'A', platforms: ['android'], status: 'active' },
  { id: 'flash-call', name: 'Flash call', icon: 'F', platforms: ['ios', 'android'], status: 'inactive' },
  { id: 'gpt-android', name: 'GPT android', icon: 'G', platforms: ['android'], status: 'active' },
  { id: 'godance', name: 'GoDance', icon: 'G', platforms: ['ios', 'android'], status: 'inactive' },
  { id: 'golive-ios', name: 'GoLive IOS', icon: 'G', platforms: ['ios', 'android'], status: 'inactive' },
  { id: 'golive-light', name: 'Golive Light', icon: 'G', platforms: ['android'], status: 'active' },
  { id: 'goliveweb', name: 'GoliveWeb', icon: 'G', platforms: ['web'], status: 'inactive' },
  { id: 'omega-android', name: 'Omega Android', icon: 'O', platforms: ['android'], status: 'active' },
  { id: 'omega-ios', name: 'Omega iOS', icon: 'O', platforms: ['ios'], status: 'active' },
  { id: 'speed-meet', name: 'Speed Meet', icon: 'S', platforms: ['ios', 'android'], status: 'inactive' },
  { id: 'streamhub-ios', name: 'StreamHub ios', icon: 'S', platforms: ['ios', 'android'], status: 'inactive' },
  { id: 'tarot-guru', name: 'Tarot Guru', icon: 'T', platforms: ['ios'], status: 'active' },
  { id: 'video-gen', name: 'Video gen', icon: 'V', platforms: ['android'], status: 'active' },
  { id: 'wedates-android', name: 'WeDates android', icon: 'W', platforms: ['android'], status: 'active' },
  { id: 'yess-android', name: 'Yess android', icon: 'Y', platforms: ['android'], status: 'active' },
  { id: 'yess-ios', name: 'Yess ios', icon: 'Y', platforms: ['ios'], status: 'active' }
]

// Остальной код будет в следующих файлах...

