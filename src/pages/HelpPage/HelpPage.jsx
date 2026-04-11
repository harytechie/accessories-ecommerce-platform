// src/pages/HelpPage/HelpPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import emailjs from '@emailjs/browser';
import './HelpPage.css';

// ── EmailJS initialization ──────────────────────────
emailjs.init('Rdh1X8rVEEQi73Vay');

const EMAILJS_SERVICE_ID = 'service_r01upqn';
const EMAILJS_TEMPLATE_ID = 'template_0n8sc9y';
const EMAILJS_PUBLIC_KEY = 'Rdh1X8rVEEQi73Vay';

const ISSUE_TYPES = [
  { id: 'order', label: 'Order Issue', icon: 'local_shipping' },
  { id: 'product', label: 'Product Inquiry', icon: 'inventory_2' },
  { id: 'account', label: 'Account Help', icon: 'person' },
  { id: 'payment', label: 'Payment Problem', icon: 'payment' },
  { id: 'other', label: 'Other', icon: 'help' },
];

const FAQ_ITEMS = [
  {
    question: 'How can I track my order?',
    answer: 'Once your order is shipped, you\'ll receive a tracking number via email. You can also view your order status in the "My Orders" section of your profile.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We accept returns within 14 days of delivery for unused items in original packaging. Contact our support team to initiate a return.',
  },
  {
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 5-7 business days within the UAE. Express shipping options are available at checkout.',
  },
  {
    question: 'Can I modify my order after placing it?',
    answer: 'You can modify your order within 2 hours of placing it. Contact our support team immediately with your order ID.',
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship to select international destinations. Shipping costs and delivery times vary by location.',
  },
];

const sendSupportEmail = async (formData) => {
  const templateParams = {
    customer_name: formData.name,
    customer_email: formData.email,
    issue_type: formData.issueType,
    order_id: formData.orderId || 'N/A',
    subject: formData.subject,
    message: formData.message,
  };

  console.log("📤 Sending Support Email:", templateParams);

  try {
    const res = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
    console.log("✅ SUCCESS:", res);
    return res;
  } catch (err) {
    console.error("❌ ERROR:", err);
    throw err;
  }
};

const HelpPage = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const { addToast } = useToast();

  const [selectedType, setSelectedType] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: isLoggedIn ? user?.name || '' : '',
    email: isLoggedIn ? user?.email || '' : '',
    orderId: '',
    subject: '',
    message: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedType) {
      addToast('Please select an issue type', 'error');
      return;
    }

    if (!formData.subject.trim() || !formData.message.trim()) {
      addToast('Please fill in all required fields', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await sendSupportEmail({
        ...formData,
        issueType: ISSUE_TYPES.find(t => t.id === selectedType)?.label || 'Other',
      });
      addToast('Your message has been sent! We\'ll get back to you soon.', 'check_circle');
      setFormData({
        ...formData,
        orderId: '',
        subject: '',
        message: '',
      });
      setSelectedType(null);
    } catch (err) {
      console.error('Support email error:', err);
      addToast('Failed to send message. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="help-page">
      <div className="help-header">
        <button className="btn-icon help-back-btn" onClick={() => navigate(-1)}>
          <span className="material-icons" style={{ fontSize: '1.25rem' }}>arrow_back</span>
        </button>
        <div className="help-header-content">
          <h1 className="help-title">Help & Support</h1>
          <p className="help-subtitle">We're here to help. How can we assist you today?</p>
        </div>
      </div>

      <div className="help-content">
        <section className="help-section">
          <h2 className="help-section-title">Frequently Asked Questions</h2>
          <div className="faq-list">
            {FAQ_ITEMS.map((item, index) => (
              <div key={index} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  aria-expanded={expandedFaq === index}
                >
                  <span>{item.question}</span>
                  <span className="material-icons faq-icon">
                    {expandedFaq === index ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {expandedFaq === index && (
                  <div className="faq-answer animate-fade-in">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="help-section">
          <h2 className="help-section-title">Contact Us</h2>
          <p className="help-section-desc">
            Can't find what you're looking for? Fill out the form below and we'll get back to you as soon as possible.
          </p>

          <form className="support-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="help-name">Your Name</label>
                <input
                  id="help-name"
                  type="text"
                  className="form-input"
                  placeholder="Layla Al Rashid"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="help-email">Email Address</label>
                <input
                  id="help-email"
                  type="email"
                  className="form-input"
                  placeholder="layla@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">What type of issue are you experiencing?</label>
              <div className="issue-type-grid">
                {ISSUE_TYPES.map(type => (
                  <button
                    key={type.id}
                    type="button"
                    className={`issue-type-btn ${selectedType === type.id ? 'selected' : ''}`}
                    onClick={() => setSelectedType(type.id)}
                  >
                    <span className="material-icons" style={{ fontSize: '1.25rem' }}>{type.icon}</span>
                    <span>{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="help-order-id">Order ID (Optional)</label>
              <input
                id="help-order-id"
                type="text"
                className="form-input"
                placeholder="ATL-XXXXXXXX"
                value={formData.orderId}
                onChange={(e) => handleChange('orderId', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="help-subject">Subject</label>
              <input
                id="help-subject"
                type="text"
                className="form-input"
                placeholder="Brief description of your issue"
                value={formData.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="help-message">Message</label>
              <textarea
                id="help-message"
                className="form-input form-textarea"
                placeholder="Please describe your issue in detail..."
                rows={5}
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full btn-lg help-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="material-icons" style={{ fontSize: '1rem' }}>refresh</span>
                  Sending...
                </>
              ) : (
                <>
                  <span className="material-icons" style={{ fontSize: '1rem' }}>send</span>
                  Send Message
                </>
              )}
            </button>
          </form>
        </section>

        <section className="help-section help-contact-alt">
          <h3 className="help-alt-title">Other ways to reach us</h3>
          <div className="help-contact-methods">
            <div className="contact-method">
              <span className="material-icons">email</span>
              <div>
                <p className="contact-method-label">Email</p>
                <p className="contact-method-value">support@atelierboutique.com</p>
              </div>
            </div>
            <div className="contact-method">
              <span className="material-icons">schedule</span>
              <div>
                <p className="contact-method-label">Response Time</p>
                <p className="contact-method-value">Within 24 hours</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HelpPage;
