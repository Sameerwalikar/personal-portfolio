"use client";

import { motion } from "framer-motion";

/* ─── Types ───────────────────────────────────────────────────── */
interface SpecRow { label: string; value: string; }
interface DeviceSpec { icon: string; title: string; subtitle: string; rows: SpecRow[]; }

/* ─── Data ────────────────────────────────────────────────────── */
const LAPTOP: DeviceSpec = {
  icon: "💻",
  title: "ASUS Gaming V16 (V3607)",
  subtitle: "Primary Development Machine",
  rows: [
    { label: "OS",                   value: "Windows 11 Home"                         },
    { label: "Processor",            value: "Intel Core 7 240H · up to 5.2 GHz · 10C/16T" },
    { label: "Graphics",             value: "NVIDIA RTX 4050 6 GB GDDR6"              },
    { label: "Integrated GPU",       value: "Intel Arc Graphics"                      },
    { label: "Display",              value: "16\" FHD+ 1920×1200 · 16:10 · 144 Hz"   },
    { label: "Brightness",           value: "300 nits"                                },
    { label: "Memory",               value: "16 GB DDR5"                              },
    { label: "Storage",              value: "512 GB PCIe 4.0 NVMe SSD"               },
    { label: "Expandability",        value: "2× DDR5 SO-DIMM · 1× M.2 slot"          },
    { label: "Keyboard",             value: "Backlit Chiclet with NumPad"             },
    { label: "Webcam",               value: "FHD IR with Privacy Shutter"             },
    { label: "Audio",                value: "ASUS SonicMaster"                        },
    { label: "Connectivity",         value: "Wi-Fi 6 · Bluetooth 5.3"                },
    { label: "Ports",                value: "2× USB-A 3.2 · 1× USB-C 3.2 · HDMI 2.1 · 3.5 mm" },
    { label: "Battery",              value: "63 Wh"                                   },
    { label: "Weight",               value: "~1.95 kg"                               },
  ],
};

const PHONE: DeviceSpec = {
  icon: "📱",
  title: "Apple iPhone 13",
  subtitle: "Daily Smartphone",
  rows: [
    { label: "OS",               value: "iOS (latest)"                          },
    { label: "Processor",        value: "Apple A15 Bionic"                      },
    { label: "Display",          value: "6.1\" Super Retina XDR OLED"           },
    { label: "Resolution",       value: "2532 × 1170 px · 460 ppi"              },
    { label: "Refresh Rate",     value: "60 Hz"                                 },
    { label: "Brightness",       value: "800 nits typical · 1200 nits HDR"      },
    { label: "Storage",          value: "128 / 256 / 512 GB"                   },
    { label: "Rear Cameras",     value: "12 MP Wide + 12 MP Ultra-Wide"         },
    { label: "Front Camera",     value: "12 MP TrueDepth"                       },
    { label: "Video",            value: "4K @ 60 fps · Dolby Vision"            },
    { label: "Face Unlock",      value: "Face ID"                               },
    { label: "Battery",          value: "Up to 19 hrs video playback"           },
    { label: "Charging",         value: "20 W wired · MagSafe 15 W · Qi"       },
    { label: "Connectivity",     value: "5G · Wi-Fi 6 · BT 5.0 · NFC"          },
    { label: "Water Resistance", value: "IP68 (6 m, 30 min)"                   },
    { label: "Weight",           value: "174 g"                                 },
  ],
};

const SETUP_CHIPS = [
  { icon: "💻", label: "Primary Laptop" },
  { icon: "📱", label: "Secondary Device" },
  { icon: "🖊️", label: "VS Code" },
  { icon: "🪟", label: "Windows 11" },
  { icon: "🌐", label: "Chrome" },
];

/* ─── Spec table ──────────────────────────────────────────────── */
function SpecTable({ device }: { device: DeviceSpec }) {
  return (
    <motion.div
      className="rounded-2xl border border-border/50 bg-surface-elevated overflow-hidden"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Device header */}
      <div className="border-b border-border/40 bg-surface px-5 py-4 flex items-center gap-3">
        <span className="text-2xl" aria-hidden>{device.icon}</span>
        <div>
          <p className="text-sm font-bold text-foreground">{device.title}</p>
          <p className="text-xs text-muted">{device.subtitle}</p>
        </div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-border/30">
        {device.rows.map((row, i) => (
          <div
            key={row.label}
            className={`flex items-start gap-4 px-5 py-2.5 text-sm
              ${i % 2 === 0 ? "bg-transparent" : "bg-white/[0.015]"}`}
          >
            <span className="w-36 shrink-0 text-xs font-semibold uppercase tracking-wide text-muted/70">
              {row.label}
            </span>
            <span className="text-foreground/90 text-xs leading-relaxed">{row.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Main export ─────────────────────────────────────────────── */
export function SystemSpecsSection() {
  return (
    <div className="space-y-6">
      <div className="grid gap-5 lg:grid-cols-2">
        <SpecTable device={LAPTOP} />
        <SpecTable device={PHONE} />
      </div>

      {/* Daily setup chips */}
      <motion.div
        className="rounded-xl border border-border/40 bg-surface-elevated px-5 py-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-muted/60">
          🚀 Daily Development Setup
        </p>
        <div className="flex flex-wrap gap-2">
          {SETUP_CHIPS.map((chip) => (
            <span
              key={chip.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-surface px-3 py-1.5 text-xs font-medium text-muted"
            >
              <span aria-hidden>{chip.icon}</span>
              {chip.label}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
