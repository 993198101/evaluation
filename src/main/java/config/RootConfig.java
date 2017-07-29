package config;

import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;

@Configuration
@ComponentScan(basePackages = { "service", "dao" })
@PropertySource("classpath:/dao/db.properties")
public class RootConfig {
	// @Value("${jdbc.url}")
	// private String url;
	@Autowired
	Environment env;
	private BasicDataSource dataSource;

	@Bean
	public Md5PasswordEncoder getMd5() {
		return new Md5PasswordEncoder();
	}

	@Bean
	public BasicDataSource getDataSource() {
		if (dataSource == null) {
			dataSource = new BasicDataSource();
			dataSource.setDriverClassName(this.env.getProperty("jdbc.driver.class"));
			dataSource.setUrl(this.env.getProperty("jdbc.url"));
			dataSource.setUsername(this.env.getProperty("jdbc.username"));
			dataSource.setPassword(this.env.getProperty("jdbc.password"));
			dataSource.setValidationQuery(this.env.getProperty("jdbc.validationQuery"));
		}
		return dataSource;
	}

	@Bean
	public JdbcTemplate getJdbcTemplate() {
		return new JdbcTemplate(this.getDataSource());
	}
}