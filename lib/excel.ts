import * as XLSX from 'xlsx'

interface ExportToExcelOptions {
  filename: string
  sheetName?: string
  data: Record<string, any>[]
  columns?: {
    key: string
    header: string
    format?: (value: any) => any
  }[]
}

export const exportToExcel = ({ filename, sheetName = 'Sheet1', data, columns }: ExportToExcelOptions) => {
  try {
    // If columns are provided, transform data according to column specifications
    const exportData = data.map((item) => {
      if (columns) {
        const transformedItem: Record<string, any> = {}
        columns.forEach((col) => {
          const value = item[col.key]
          transformedItem[col.header] = col.format ? col.format(value) : value
        })
        return transformedItem
      }
      return item
    })

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(exportData)

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, sheetName)

    // Generate filename with date if not .xlsx
    const fullFilename = filename.endsWith('.xlsx')
      ? filename
      : `${filename}_${new Date().toISOString().split('T')[0]}.xlsx`

    // Save file
    XLSX.writeFile(wb, fullFilename)
    return true
  } catch (error) {
    console.error('Error exporting to Excel:', error)
    return false
  }
}

// Định dạng tiền tệ VND
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

// Định dạng trạng thái thanh toán
export const formatPaymentStatus = (status: string): string => {
  switch (status) {
    case 'completed':
      return 'Hoàn thành'
    case 'pending':
      return 'Đang xử lý'
    case 'failed':
      return 'Thất bại'
    default:
      return status
  }
}
