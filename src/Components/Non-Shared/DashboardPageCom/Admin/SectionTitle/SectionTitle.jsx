import "./sectionTitle.css";

const SectionTitle = ({ title }) => {
    return (
        <div class="admin_sec_title">
            <h1 className="heading_1">{title}</h1>
        </div>
    );
};

export default SectionTitle;