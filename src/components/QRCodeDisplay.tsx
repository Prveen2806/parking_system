import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button, Space, Typography } from 'antd';
import { DownloadOutlined, PrinterOutlined } from '@ant-design/icons';
import html2canvas from 'html2canvas';

const { Title, Paragraph } = Typography;

interface QRCodeDisplayProps {
  data: string;
  slotId: string;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ data, slotId }) => {
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (qrCodeRef.current) {
      const canvas = await html2canvas(qrCodeRef.current);
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `parking-qr-${slotId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handlePrint = () => {
    if (qrCodeRef.current) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write('<html><head><title>Parking QR Code</title></head><body>');
        printWindow.document.write('<style>@media print { body { -webkit-print-color-adjust: exact; } }</style>');
        printWindow.document.write(`<div style="display: flex; flex-direction: column; align-items: center; padding: 20px;">${qrCodeRef.current.innerHTML}</div>`);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <Title level={3}>Your Parking QR Code</Title>
      <Paragraph>Please save or print this QR code for future reference and theft activity tracking.</Paragraph>
      <div ref={qrCodeRef} style={{ margin: '20px 0', border: '1px solid #f0f0f0', padding: '10px', display: 'inline-block', background: '#fafafe' }}>
        <QRCodeSVG value={data} size={256} level="H" />
      </div>
      <Paragraph strong>Slot ID: {slotId}</Paragraph>
      <Space size="middle" style={{ marginTop: '20px' }}>
        <Button type="primary" icon={<DownloadOutlined />} onClick={handleDownload}>
          Download QR
        </Button>
        <Button icon={<PrinterOutlined />} onClick={handlePrint}>
          Print QR
        </Button>
      </Space>
    </div>
  );
};
